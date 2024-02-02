import { NextFunction, Response, Request } from 'express';
import { Op, Sequelize, WhereOptions } from 'sequelize';
import { getPagination } from 'utils/pagingUtils';
import { escapeChars } from 'utils/messageUtil';
import FormData from 'form-data';
import PDFDocument from 'pdfkit';
import { bortskaffelseCode, carryin2peopleCode, carryinCode, monteringCode, freshDeskEmailTemplate, sendFreshDeskEmail, sendToShipmondo, sendToDropBoy, getDropBoyOrderInfo, getShipmondoLabel, shipmondoGetProducts, shipmondoGetCarriers } from '../../lib/pevino/pevinoHelper';
import { formatDate, isValid } from '../../utils/commonUtil';
import { BookShipmentRequest, PreRequisiteRequest, OrderShipmentRequest, ShipmentDataRequest, PrintOrderRequest, PreviousShipmentDataRequest, ShipmondoPrintRequest, CaculatePriceRequest, TaricCodeRequest, ShipmondoProductRequest, ShipmondoCarrierRequest, /* DropboyShipmentLabelsRequest */ } from './schema';
import { ShipmentData, EstateInfo, Shipment, ShipmondoResponse, ShipmondoPrintLabelsResponse, CalculateShipmentPrice, GoodsInfo, ShipmondoProductCodeResponse, DropBoyResponse, DropBoyGetOrderResponse } from './types';
import db from '../../models/index';
import logger from '../../config/logger';
import taricCodes from './taric-codes.json';

export async function getOrderStatus(req: Request, res: Response, next: NextFunction) {
	try {
		const orderStatus = await db.orderStatus.findAll({
			attributes: { exclude: ['createdAt', 'updatedAt'] }
		});
		return res.status(200).json(orderStatus);
	} catch (error) {
		return next(error);
	}
}

export async function getShipmentById(req: Request, res: Response, next: NextFunction) {
	const { id } = req.params;
	const shipmentInfo = await db.shipment.findByPk(id, {
		include: [
			{ model: db.cargo, attributes: { exclude: ['createdAt', 'updatedAt'] } },
			{ model: db.goods, attributes: { exclude: ['createdAt', 'updatedAt'] } },
			{ model: db.carrierCountryConfig, include: [{ model: db.carrier }], attributes: { exclude: ['createdAt', 'updatedAt'] } },
			{
				model: db.order,
				include: [{ model: db.deliveryMethod, nested: true, attributes: { exclude: ['createdAt', 'updatedAt'] } }],
				attributes: { exclude: ['createdAt', 'updatedAt'] }
			}
		],
		attributes: { exclude: ['createdAt', 'updatedAt'] }
	});
	const customCodes = Object.keys(taricCodes).map((key: string) => { return { code: key, text: taricCodes[key] }; });
	return res.status(200).json({ shipment: shipmentInfo, customCodes });
}

export async function getPreRequisites(req: PreRequisiteRequest, res: Response, next: NextFunction) {
	try {
		const { orderId } = req.query;
		if (orderId === undefined) {
			return res.status(400).json({
				isSuccess: false,
				error: { message: 'orderId is required.' }
			});
		}

		const order = await db.order.findOne({
			include: [
				{ model: db.customer, nested: true, attributes: { exclude: ['createdAt', 'updatedAt'] } },
				{ model: db.deliveryMethod, nested: true, attributes: { exclude: ['createdAt', 'updatedAt'] } },
				{ model: db.paymentMethod, nested: true, attributes: { exclude: ['createdAt', 'updatedAt'] } },
				{ model: db.orderStatus, nested: true, attributes: { exclude: ['createdAt', 'updatedAt'] } },
				{
					model: db.orderLine,
					include: [{ model: db.product, nested: true }],
					nested: true,
					attributes: { exclude: ['createdAt', 'updatedAt'] }
				}
			],
			attributes: { exclude: ['createdAt', 'updatedAt'] },
			where: { webshopId: orderId }
		});

		const shipment = await db.shipment.findOne({
			include: [
				{ model: db.cargo, attributes: { exclude: ['createdAt', 'updatedAt'] } }
			],
			attributes: { exclude: ['createdAt', 'updatedAt'] },
			where: { orderId: order.webshopId }
		});
		return res.status(200).json({ order, ...{ shipment } });
	} catch (error) {
		return next(error);
	}
}

export async function getCarrierConfig(req: Request, res: Response, next: NextFunction) {
	try {
		const carrierConfig = await db.carrierCountryConfig.findAll({
			include: [
				{
					model: db.carrier,
					nested: true,
					attributes: { exclude: ['logo', 'createdAt', 'updatedAt'] },
				},
				{
					model: db.country,
					nested: true,
					attributes: { exclude: ['createdAt', 'updatedAt'] },
				}
			],
			attributes: { exclude: ['carrierId', 'countryId', 'createdAt', 'updatedAt'] },
		});

		return res.status(200).json(carrierConfig);
	} catch (error) {
		return next(error);
	}
}
const getpackaging = (carrier: string) => {
	if (carrier.toLowerCase().localeCompare('gls') === 0) {
		return 'CLL';
	}
	return 'PLL';
};

async function createBookingDropboy(shipId: number) {
	const shipment = (await db.shipment.findOne({
		include: [
			{ model: db.order, attributes: { exclude: ['createdAt', 'updatedAt'] } },
			{ model: db.cargo, attributes: { exclude: ['createdAt', 'updatedAt'] } },
			{ model: db.goods, attributes: { exclude: ['createdAt', 'updatedAt'] } },
			{ model: db.carrierCountryConfig, include: [{ model: db.carrier }], attributes: { exclude: ['createdAt', 'updatedAt'] } }
		],
		attributes: { exclude: ['createdAt', 'updatedAt'] },
		where: { id: shipId }
	})).get() as unknown as Shipment;

	const pickuped = shipment.returnStatus;
	const orderNumber = `WINEB${shipment.orderId}`;
	const originPhone = {
		prefix: Number(shipment.originPhonePrefix),
		number: Number(shipment.originPhoneNumber)
	};
	const originTimeWindow = {
		start: shipment.originTimeWindowStart,
		end: shipment.originTimeWindowEnd,
		timeType: 'between',
		lock: true // trueOrFalseBoolean($shipment['originTimeWindowLock'])
	};

	const origin = {
		companyName: shipment.originCompanyName,
		attention: shipment.originName,
		address: shipment.originAddress,
		extraInfo: shipment.originExtraInfo,
		zipCode: shipment.originZipCode?.replace(/\s/g, ''),
		city: shipment.originCity,
		email: shipment.originEmail,
		phone: Number(originPhone),
		timeWindow: originTimeWindow,
		comments: shipment.deliveryInstruction // origincom['originComments']
	};

	const destinationPhone = {
		prefix: Number(shipment.originPhonePrefix),
		number: Number(shipment.customerPhone)
	};

	const destinationTimeWindow = {
		start: shipment.timeWindowStart,
		end: shipment.timeWindowEnd,
		timeType: 'between',
		lock: true // trueOrFalseBoolean($shipment['timeWindowLock'])
	};

	const destination = {
		companyName: shipment.companyName,
		attention: shipment.customerName,
		address: shipment.customerAddress,
		extraInfo: shipment.customerExtraAddress,
		zipCode: shipment.customerZipcode?.replace(/\s/g, ''),
		city: shipment.customerCity,
		email: shipment.customerEmail,
		phone: Number(destinationPhone),
		timeWindow: destinationTimeWindow,
		comments: shipment.deliveryInstruction // shipment['comments']
	};

	const services = JSON.parse(shipment.services);

	const orderObject = {
		orderNumber,
		orderType: 'distribution',
		pickuped,
		origin,
		destination,
		cargo: shipment.cargos.map((cargo) => {
			return {
				amount: cargo.amount,
				type: getpackaging(shipment.carrierCountryConfig?.carrier?.carrier?.toLowerCase()),
				description: cargo.description,
				weight: cargo.weight,
				volume: (cargo.width * cargo.depth * cargo.height) / 1000000,
				dimensions: {
					width: cargo.width,
					height: cargo.height,
					length: cargo.depth,
					services: Object.keys(services).map((service) => {
						return {
							serviceId: services[service]
						};
					})
				}
			};
		}),
	};

	// check if carrier is skanlog or skanlogSE
	const contractKey = (shipment.carrierCountryConfig.carrierProduct === 'SkanlogSE') ? '5298a561-ecf1-4351-b6de-15ae86e4ed46' : 'd6820604-3778-4cab-a7a8-c6ae85f2188d';

	const booking = [{
		contractKey,
		order: orderObject
	}];

	const orderJson = JSON.stringify({
		version: '1.0',
		data: booking
	});

	const form = new FormData();
	const buffer = Buffer.from(orderJson);
	form.append('batch', buffer, { filename: 'order.json' });

	try {
		const response = await sendToDropBoy<DropBoyResponse>(form);
		if (response.data && !response.data.errors) {
			const platformId = response.data.result.batchFileId;
			await db.shipment.update({ platformId: platformId.toString() }, { where: { id: shipId } });
			return platformId;
		}
		if (response.data.errors) {
			await db.shipment.update({ error: response.data.errors.join('\n') }, { where: { id: shipId } });
		}
	} catch (error) {
		await db.shipment.update({ error }, { where: { id: shipId } });
	}
	return null;
}

async function PDFPrintDropboyShipment(shipId: number): Promise<string> {
	const shipment = (await db.shipment.findOne({
		include: [
			{ model: db.order, attributes: { exclude: ['createdAt', 'updatedAt'] } },
			{ model: db.cargo, attributes: { exclude: ['createdAt', 'updatedAt'] } },
			{ model: db.goods, attributes: { exclude: ['createdAt', 'updatedAt'] } },
			{ model: db.carrierCountryConfig, include: [{ model: db.carrier }], attributes: { exclude: ['createdAt', 'updatedAt'] } }
		],
		attributes: { exclude: ['createdAt', 'updatedAt'] },
		where: { id: shipId }
	})).get() as unknown as Shipment;

	const hubInfo = shipment.carrierCountryConfig.carrierProduct === 'SkanlogSE';
	const skanlogSeHub = await db.skanlogSeHub.findOne({
		where: {
			minZip: { [Op.lte]: shipment.customerZipcode },
			maxZip: { [Op.gte]: shipment.customerZipcode }
		}
	});

	return new Promise((resolve, reject) => {
		try {
			// for size 3.93 × 7.48 in
			const doc = new PDFDocument({ size: [283.5, 538.48], margin: 40 });
			const bufferChunks = [];
			// Store buffer chunk to array
			doc.on('readable', () => bufferChunks.push(doc.read()));
			// Store buffer chunk to array
			doc.on('end', () => resolve(Buffer.concat(bufferChunks).toString('base64')));

			const originAddress = `${shipment.originAddress}${isValid(shipment.originExtraInfo) ? `, ${shipment.originExtraInfo}` : ''}`;
			const address = `${shipment.customerAddress}${isValid(shipment.customerExtraAddress) ? `, ${shipment.customerExtraAddress}` : ''}`;
			let originName = shipment.originCompanyName;
			if (originName !== shipment.originName) {
				originName += `, ${shipment.originName}`;
			}
			let name = shipment.companyName;
			if (name !== shipment.customerName) {
				name += `, ${shipment.customerName}`;
			}

			const fontName = 'Helvetica';
			const boldFontName = 'Helvetica-Bold';
			const fontItalicName = 'Helvetica-Oblique';

			doc.font(boldFontName).fontSize(18).text(`WINEB${shipment.orderId}`).moveDown(1);
			doc.font(boldFontName).fontSize(16).text('Receiver:').moveDown(0.8);
			doc.font(fontName).fontSize(12).text(name);
			doc.fontSize(12).text(address);
			doc.fontSize(12).text(`${shipment.customerZipcode} - ${shipment.customerCity}`);
			doc.fontSize(12).text(shipment.customerPhone);
			doc.moveDown(1);
			if (!hubInfo) {
				doc.font(boldFontName).fontSize(14).text('Delivery:');
				doc.font(fontName).fontSize(12).text(formatDate(shipment.timeWindowStart));
			}
			doc.moveDown(1);
			if (isValid(shipment.deliveryInstruction)) {
				doc.font(boldFontName).fontSize(14).text('Instruction:');
				doc.font(fontName).fontSize(12).text(shipment.deliveryInstruction);
				doc.moveDown(1);
			}
			if (hubInfo && !shipment.returnStatus) {
				doc.fontSize(12).text(`Zone: ${skanlogSeHub?.zone}.`);
				doc.fontSize(12).text(`Hub: ${skanlogSeHub?.hub}.`);
				doc.moveDown(1);
			}
			doc.font(boldFontName).fontSize(16).text('Sender:').moveDown(0.8);
			doc.font(fontName).fontSize(12).text(originName);
			doc.fontSize(12).text(originAddress);
			doc.fontSize(12).text(`${shipment.originZipCode} - ${shipment.originCity}`);
			doc.fontSize(12).text(shipment.originPhoneNumber);
			doc.moveDown(1);
			doc.font(boldFontName).fontSize(14).text('Pickup:');
			doc.font(fontName).fontSize(12).text(formatDate(shipment.shipmentDate));
			doc.moveDown(1);
			doc.font(fontItalicName).fontSize(12).text('Delivered by Skanlog Direct');
			doc.end();
		} catch (e) {
			reject(e);
		}
	});
}

async function getOrderDropBoyAndUpdateExternalInfo(shipId: number, orderId: number, platformId: string) {
	await new Promise((r) => setTimeout(r, 2000));
	const response = await getDropBoyOrderInfo<DropBoyGetOrderResponse>(platformId);
	if (response.data !== null && response.data.errors === null) {
		const resultOrder = response.data.result.filter((x) => x.orderNumber === `WINEB${orderId}`);
		if (resultOrder.length > 0) {
			// eslint-disable-next-line no-underscore-dangle
			const externalId = resultOrder[0]._id;
			const trackTrace = resultOrder[0].tntKey;
			await db.shipment.update({ externalCarrierId: externalId, trackTrace }, { where: { id: shipId } });
			return true;
		}
	}
	return false;
}

async function sendFreshdeskEmail(shipmentId: number) {
	const shipment = await db.shipment.findByPk(shipmentId);
	// by default english en
	let msg = `Hej ${shipment.customerName} <br/><br/>Your shipment is now registered with the carrier and can be followed at the following link: <a href="https://app.wuxus.com/TrackAndTrace.html?orderNr=WINEB${shipment.orderId}&tatkey=${shipment.trackTrace}&type=delivery&lng=da" target ="_blank"> Link to track & trace </a>. <br> The route that the delivery car follows will only be planned on the delivery date, and the estimated delivery time will therefore be specified on the delivery date. You can therefore keep an eye on the link on the actual delivery day from the morning. <br/> <br/> <b> Important </b> <br/> Are you not home when the carrier arrives and have you not given permission? in order for the shipment to be set (eg in the carport), the carrier will take the shipment back so that it can be delivered another day for a return delivery fee of DKK 250. <b> It is therefore important </b> that you are aware that when the freight forwarder arrives.`;
	let subject = `[Important] Track & trace for order ${shipment.orderId}`;

	if (shipment.customerCountry === 'DK') { // danish
		msg = `Hej ${shipment.customerName} <br/><br/>Din forsendelse er nu registreret hos transportfirmaet, og kan følges på følgende link: <a href="https://app.wuxus.com/TrackAndTrace.html?orderNr=WINEB${shipment.orderId}&tatkey=${shipment.trackTrace}&type=delivery&lng=da" target="_blank"> Link til track & trace</a>. <br>Ruten som leveringsbilen følger, bliver først planlagt på leveringsdatoen, og det estimerede leveringstidspunkt vil derfor præcisere sig på leveringsdagen. Du kan derfor med fordel holde øje med linket på selve leveringsdagen fra morgenstunden.<br/><br/><b>Vigtigt</b><br/>Er du ikke hjemme, når fragtmanden kommer, og har du ikke givet tilladelse til at forsendelsen kan sættes (fx i carporten), vil fragtmanden tage forsendelsen med tilbage, så den kan leveres en anden dag mod et genleveringsgebyr på 250 kr. <b>Det er derfor vigtigt</b>, at du er opmærksom på, hvornår fragtmanden kommer.`;
		subject = `[Vigtigt] Track & trace for ordre ${shipment.orderId}`;
	} else if (shipment.customerCountry === 'SE') { // swedish
		msg = `Hej ${shipment.customerName} <br/><br/>Din försändelse är nu registrerad hos transportören och kan följas på följande länk: <a href="https://app.wuxus.com/TrackAndTrace.html?orderNr=WINEB${shipment.orderId}&tatkey=${shipment.trackTrace}&type=delivery&lng=da" target ="_blank"> Länk till track & trace </a>. <br> Rutten som leveransbilen följer kommer endast att planeras på leveransdatum, och beräknad leveranstid kommer därför att anges på leveransdatum. Du kan därför hålla ett öga på länken på själva leveransdagen från morgonen <br/> <br/> <b> Viktigt </b> <br/> Är du inte hemma när transportören kommer och har du inte För att försändelsen ska kunna ställas in (t.ex. i carporten) tar transportören tillbaka försändelsen så att den kan levereras en annan dag mot en returleveransavgift på DKK 250. <b> Det är därför viktigt < /b> att du är medveten om det när speditören kommer.`;
		subject = `[Viktigt] Track & trace för beställning ${shipment.orderId}`;
	}

	const services = JSON.parse(shipment.services);
	const extraCode = '588ef4a2ccf9b6fd26e38936';
	const twoMen = Object.keys(services).filter((x) => services[x] === extraCode || services[x] === carryin2peopleCode).length > 0;

	// Change message if two men
	if (twoMen) {
		// by default english en
		msg = `Hej ${shipment.customerName}<br/><br/>Your shipment is now registered with the transport company. Since you have chosen delivery with the support of two people, the shipping company will call you <b> within 2-3 working days </b> to arrange a delivery time directly with you. You do not have to call to make an appointment yourself. <br/> <br/> <b> Contact information for the freight company </b> <br/> Phone: 51 44 46 43 (They will contact you regarding the time of delivery) < br /> Mail: distribution@skanlog-direct.com <br/> <br/> When contacting the shipping company directly, please always have your order number WINEB '$ {shipment.orderId} ready. <br/> <br/> < b> Important </b> <br/> If you are not at home when the carrier arrives and you have not given permission for the shipment to be set (eg in the carport), the carrier will take the shipment back so that it can be delivered to another day against a return delivery fee of DKK 250. <b> It is therefore important </b> that you are aware of when the freight forwarder arrives.`;
		subject = `[Important] Re. delivery of your order ${shipment.orderId}`;
		if (shipment.customerCountry === 'DK') { // danish
			msg = `Hej ${shipment.customerName}<br/><br/>Din forsendelse er nu registreret hos transportfirmaet. Da du har valgt levering med opbæring af to personer, vil fragtfirmaet ringe dig op <b>inden for 2-3 arbejdsdage</b> for at aftale en leveringstid direkte med dig. Du skal derfor ikke selv ringe for at aftale tid.<br/><br/><b>Kontaktoplysning til fragtfirmaet</b><br/>Telefon: 51 44 46 43 (De kontakter dig mht. tidspunkt for levering)<br/>Mail: distribution@skanlog-direct.com<br/><br/>Ved henvendelse direkte til fragtfirmaet, hav venligst altid dit ordrenummer WINEB'${shipment.orderId} klar.<br/><br/><b>Vigtigt</b><br/>Er du ikke hjemme, når fragtmanden kommer, og har du ikke givet tilladelse til at forsendelsen kan sættes (fx i carporten), vil fragtmanden tage forsendelsen med tilbage, så den kan leveres en anden dag mod et genleveringsgebyr på 250 kr. <b>Det er derfor vigtigt</b>, at du er opmærksom på, hvornår fragtmanden kommer.`;
			subject = `[Vigtigt] Vedr. levering af din ordre ${shipment.orderId}`;
		} else if (shipment.customerCountry === 'SE') { // swedish
			msg = `Hej ${shipment.customerName}<br/><br/>Din försändelse är nu registrerad hos transportföretaget. Eftersom du har valt leverans med stöd av två personer kommer fraktbolaget att ringa dig <b> inom 2-3 arbetsdagar </b> för att avtala en leveranstid direkt med dig. Du behöver inte ringa för att boka tid själv. <br/> <br/> <b> Kontaktuppgifter till fraktföretaget </b> <br/> Telefon: 51 44 46 43 (De kontaktar dig angående leveranstid) < br /> Mail: distribution@skanlog-direct.com <br/> <br/> När du kontaktar fraktbolaget direkt, vänligen ha alltid ditt ordernummer WINEB '$ {shipment.orderId} redo. <br /> <br/> < b> Viktigt </b> <br/> Om du inte är hemma när transportören anländer och du inte har gett tillstånd till att försändelsen ska ställas in (t.ex. i carporten), kommer transportören ta tillbaka försändelsen så att den kan levereras till en annan dag mot en returleveransavgift på DKK 250. <b> Det är därför viktigt </b> att du är medveten om när speditören kommer.`;
			subject = `[Viktigt] Re. leverans av din beställning ${shipment.orderId}`;
		}
	}

	const emailContent = freshDeskEmailTemplate.replace('{message}', msg).replace('{subject}', subject);
	await sendFreshDeskEmail(shipment.customerName, shipment.customerEmail, subject, emailContent);
	await db.shipment.update({ trackTraceSend: new Date() }, { where: { id: shipment.id } });
}

async function createBookingShipmondo(shipId: number) {
	const shipmentInfo = (await db.shipment.findOne({
		include: [
			{ model: db.order, attributes: { exclude: ['createdAt', 'updatedAt'] } },
			{ model: db.cargo, attributes: { exclude: ['createdAt', 'updatedAt'] } },
			{ model: db.goods, attributes: { exclude: ['createdAt', 'updatedAt'] } },
			{ model: db.carrierCountryConfig, include: [{ model: db.carrier }], attributes: { exclude: ['createdAt', 'updatedAt'] } }
		],
		attributes: { exclude: ['createdAt', 'updatedAt'] },
		where: { id: shipId }
	})).get() as unknown as Shipment;

	const cargos = shipmentInfo.cargos.map((cargo) => {
		return {
			packaging: getpackaging(shipmentInfo.carrierCountryConfig.carrier.carrier),
			weight: cargo.weight * 1000 * cargo.amount,
			length: cargo.depth * cargo.amount,
			quantity: cargo.amount,
			width: cargo.width,
			height: cargo.height,
			running_metre: ((cargo.width / 100) * ((cargo.depth * cargo.amount) / 100)) / 2.4,
			volume: (cargo.width * cargo.height * cargo.depth) / 1000000,
		};
	});

	let delInstructions = shipmentInfo.deliveryInstruction;

	if (shipmentInfo.carrierCountryConfig.carrier.carrier.toLowerCase() === 'dsv') {
		delInstructions = `ADVISER TELEFONISK. ${shipmentInfo.customerName === shipmentInfo.companyName ? 'PRIVAT KUNDE ' : ''}.${delInstructions}`;
	}

	const receiver = {
		name: shipmentInfo.companyName,
		attention: shipmentInfo.customerName,
		address1: shipmentInfo.customerAddress,
		address2: shipmentInfo.customerExtraAddress,
		zipcode: shipmentInfo.customerZipcode,
		city: shipmentInfo.customerCity,
		country_code: shipmentInfo.customerCountry === 'UK' ? 'GB' : shipmentInfo.customerCountry,
		email: shipmentInfo.customerEmail,
		telephone: shipmentInfo.customerPhone,
		mobile: shipmentInfo.customerPhone,
		instruction: delInstructions,
	};

	const pickUp = {
		name: shipmentInfo.originCompanyName,
		attention: shipmentInfo.originName,
		address1: shipmentInfo.originAddress,
		address2: null,
		zipcode: shipmentInfo.originZipCode,
		city: shipmentInfo.originCity,
		country_code: shipmentInfo.originCountry,
		telephone: shipmentInfo.originPhoneNumber,
		phone: shipmentInfo.originPhoneNumber,
		date: shipmentInfo.shipmentDate,
		instruction: null,
		from_time: 8,
		to_time: 9,
		pickup_custom: false
	};

	const sender = {
		name: shipmentInfo.originCompanyName,
		attention: shipmentInfo.originName,
		address1: shipmentInfo.originAddress,
		address2: shipmentInfo.originExtraInfo,
		zipcode: shipmentInfo.originZipCode,
		city: shipmentInfo.originCity,
		country_code: shipmentInfo.originCountry,
		email: shipmentInfo.originEmail,
		telephone: shipmentInfo.originPhoneNumber,
		mobile: shipmentInfo.originPhoneNumber,
	};

	const services = [];

	if (shipmentInfo.carrierCountryConfig.privateAddress) {
		services.push('PRIVATE_ADDRESS');
	}

	if (shipmentInfo.carrierCountryConfig.smsNt) {
		services.push('SMS_NT');
	}

	if (shipmentInfo.carrierCountryConfig.emailNt) {
		services.push('EMAIL_NT');
	}

	if (shipmentInfo.carrierCountryConfig.smsPnt) {
		services.push('SMS_PNT');
	}

	if (shipmentInfo.carrierCountryConfig.emailPnt) {
		services.push('EMAIL_PNT');
	}

	if (shipmentInfo.flexLiability) {
		services.push('FLEX');
	}

	if (shipmentInfo.phoneNotification) {
		services.push('PHONE_NT');
	}

	let shipmondoBody = {
		test_mode: false,
		own_agreement: true,
		label_format: '10x19_pdf',
		product_code: shipmentInfo.carrierCountryConfig.carrierProduct,
		service_codes: services.join(','),
		automatic_select_service_point: true,
		sender,
		receiver,
		parcels: cargos,
		pick_up: pickUp,
		customs: null,
		print: false,
		reference: shipmentInfo.orderId.toString(),
		order_id: shipmentInfo.orderId.toString(),
	};

	const shipCountry = shipmentInfo.returnStatus ? shipmentInfo.originCountry : shipmentInfo.customerCountry;
	if (['no', 'ch', 'uk'].indexOf(shipCountry.toLowerCase()) > -1) {
		const termOfTrade = (country: string) => {
			switch (country.toLowerCase()) {
				case 'no':
					return 'DAP';
				case 'ch':
					return 'DDP';
				case 'uk':
					return 'DAP';
				default:
					return 'DAP';
			}
		};

		const goods = shipmentInfo.goods.map((good) => {
			return {
				quantity: good.quantity,
				country_code: good.countryCode,
				content: good.title,
				commodity_code: good.customsCode,
				unit_value: good.unitValue,
				unit_weight: good.weight
			};
		});

		const customs = {
			export_reason: shipmentInfo.returnStatus ? 'returned_goods' : 'sale_of_goods',
			term_of_trade: termOfTrade(shipmentInfo.customerCountry),
			currency_code: shipmentInfo.order.currency,
			goods
		};
		shipmondoBody = { ...shipmondoBody, customs };
	}
	logger.info(JSON.stringify(shipmondoBody));
	try {
		const result = await sendToShipmondo<ShipmondoResponse>(shipmondoBody);
		if (result.data.id && !result.data.error) {
			const externalId = result.data.parcels.map((parcel) => parcel.pkg_no).join(';');
			const platformId = result.data.id;
			await db.shipment.update({ externalCarrierId: externalId, platformId: platformId.toString() }, { where: { id: shipId } });
			return (result.data.labels);
		}

		if (result.data.error) {
			await db.shipment.update({ error: result.data.error.toString() }, { where: { id: shipId } });
		}
	} catch (e) {
		logger.error(e);
		await db.shipment.update({ error: `${e}` }, { where: { id: shipId } });
	}
	return ([]);
}

export async function getShipmondoPrintLabels(req: ShipmondoPrintRequest, res: Response, next: NextFunction) {
	try {
		const { Ids } = req.query;
		const shipments = (await db.shipment.findAll({
			include: [
				{ model: db.carrierCountryConfig, include: [{ model: db.carrier }], attributes: { exclude: ['createdAt', 'updatedAt'] } }
			],
			where: {
				id: { [Op.in]: Ids.split(',').map((id) => parseInt(id, 0)) },
				platformId: { [Op.ne]: null }
			}
		})).map((x) => x.get() as unknown as Shipment);

		const response: ShipmondoPrintLabelsResponse[] = [];
		const shipmondoRequests = shipments.filter((x) => x.carrierCountryConfig.carrier.platform === 'Shipmondo');
		if (shipmondoRequests.length > 0) {
			const shipmondoIds = shipmondoRequests.map((x) => x.platformId).join(',');
			const result = await getShipmondoLabel<ShipmondoPrintLabelsResponse>(shipmondoIds);
			response.push(...result.data);
		}

		const dropBoyRequests = shipments.filter((x) => x.carrierCountryConfig.carrier.platform === 'Dropboy');
		if (dropBoyRequests.length > 0) {
			for (let index = 0; index < dropBoyRequests.length; index += 1) {
				const dropBoyResponse: ShipmondoPrintLabelsResponse = {
					id: dropBoyRequests[index].id,
					// eslint-disable-next-line no-await-in-loop
					labels: [{ file_format: 'pdf', base64: await PDFPrintDropboyShipment(dropBoyRequests[index].id) }]
				};
				response.push(dropBoyResponse);
			}
		}

		return res.status(200).json(response);
	} catch (e) {
		logger.error(e);
	}
	return res.status(200).json([]);
}

export async function getOrdersForShipment(req: OrderShipmentRequest, res: Response, next: NextFunction) {
	try {
		const { orderStatus } = req.query;
		if (orderStatus === undefined) {
			return res.status(400).json({
				isSuccess: false,
				error: { message: 'invalid orderStatus provided' }
			});
		}
		const orderStatusArray = orderStatus && String(orderStatus).length > 0 ? (String(orderStatus)?.split(',')?.map((os) => Number(os)) ?? []) : [];
		let whereClause: WhereOptions = {};
		if (orderStatusArray.length > 0) {
			whereClause = {
				...whereClause,
				orderStatusId: { [Op.in]: orderStatusArray }
			};
		}
		const order = await db.order.findAll({
			include: [
				{ model: db.customer, nested: true, attributes: { exclude: ['createdAt', 'updatedAt'] } },
				{ model: db.deliveryMethod, nested: true, attributes: { exclude: ['createdAt', 'updatedAt'] } },
				{ model: db.paymentMethod, nested: true, attributes: { exclude: ['createdAt', 'updatedAt'] } },
				{ model: db.orderStatus, nested: true, attributes: { exclude: ['createdAt', 'updatedAt'] } },
			],
			attributes: { exclude: ['createdAt', 'updatedAt'] },
			where: whereClause
		});
		const shipments = order
			.map((item) => item.get() as unknown as ShipmentData)
			.map((orderData: ShipmentData) => {
				return {
					orderId: orderData.webshopId,
					customerName: isValid(orderData.deliveryAddress) ? orderData.deliveryAttention : `${orderData.customer.firstName} ${orderData.customer.lastName}`,
					address: isValid(orderData.deliveryAddress) ? `${orderData.deliveryAddress}` : `${orderData.customer.address1}`,
					zipCode: isValid(orderData.deliveryAddress) ? orderData.deliveryZipCode : orderData.customer.zipCode,
					town: isValid(orderData.deliveryAddress) ? orderData.deliveryCity : orderData.customer.city,
					country: isValid(orderData.deliveryAddress) ? orderData.deliveryCountry : orderData.customer.country,
					deliveryMethodId: orderData.deliveryMethodId,
					deliveryMethodTitle: orderData.deliveryMethod.title,
					paymentMethodId: orderData.paymentMethodId,
					paymentMethodTitle: orderData.paymentMethod.paymentMethodTitle,
					deliveryImage: orderData.deliveryMethod.logo,
					paymentImage: orderData.paymentMethod.logo,
					isSelected: false
				};
			});

		return res.status(200).json(shipments);
	} catch (error) {
		return next(error);
	}
}

function padLeadingZeros(num: number, size: number) {
	let s = String(num);
	while (s.length < size) s = `0${s}`;
	return s;
}

function getNumber(num: string | null) {
	if (num != null) {
		return (Number.isNaN(Number(num)) ? 0 : Number(num));
	}
	return 0;
}

export async function getShipmentData(req: ShipmentDataRequest, res: Response, next: NextFunction) {
	try {
		const { reportDate } = req.query;
		if (reportDate === undefined) {
			return res.status(400).json({
				isSuccess: false,
				error: { message: 'invalid reportDate provided' }
			});
		}
		let whereClause: WhereOptions = {};
		const todayDate = new Date();
		let dateFrom = new Date(`${todayDate.getFullYear()}-${padLeadingZeros(todayDate.getMonth() + 1, 2)}-${padLeadingZeros(todayDate.getDate(), 2)}`);
		let dateTo = new Date(dateFrom.getTime() + (1 * 24 * 60 * 60 * 1000));
		if (reportDate === 'today') {
			whereClause = {
				...whereClause,
				shipmentDate: { [Op.gt]: dateFrom, [Op.lt]: dateTo },
				returnStatus: false
			};
		} else if (reportDate === 'future') {
			whereClause = {
				...whereClause,
				shipmentDate: { [Op.gt]: dateTo },
				returnStatus: false
			};
		} else if (reportDate === 'return') {
			whereClause = {
				...whereClause,
				shipmentDate: { [Op.gt]: dateFrom },
				returnStatus: true
			};
		} else {
			dateFrom = new Date(reportDate);
			dateTo = new Date(new Date(reportDate).getTime() + (1 * 24 * 60 * 60 * 1000));
			whereClause = {
				...whereClause,
				shipmentDate: { [Op.gt]: dateFrom, [Op.lt]: dateTo },
				returnStatus: false
			};
		}

		const shipmentInfo = await db.shipment.findAll({
			include: [
				{ model: db.cargo, attributes: { exclude: ['createdAt', 'updatedAt'] } },
				{ model: db.goods, attributes: { exclude: ['createdAt', 'updatedAt'] } },
				{ model: db.carrierCountryConfig, include: [{ model: db.carrier }], attributes: { exclude: ['createdAt', 'updatedAt'] } },
				{
					model: db.order,
					include: [{ model: db.deliveryMethod, nested: true, attributes: { exclude: ['createdAt', 'updatedAt'] } }],
					attributes: { exclude: ['createdAt', 'updatedAt'] }
				}
			],
			attributes: { exclude: ['createdAt', 'updatedAt'] },
			where: whereClause
		});
		return res.status(200).json(shipmentInfo);
	} catch (error) {
		return next(error);
	}
}

export async function getPreviousShipmentData(req: PreviousShipmentDataRequest, res: Response, next: NextFunction) {
	try {
		const { rowsPerPage, page, search } = req.query;
		const todayDate = new Date();
		const dateFrom = new Date(`${todayDate.getFullYear()}-${padLeadingZeros(todayDate.getMonth() + 1, 2)}-${padLeadingZeros(todayDate.getDate(), 2)}`);
		let whereClause: WhereOptions = {
			shipmentDate: { [Op.lt]: dateFrom }
		};
		if (search && search?.toString() !== '') {
			const searchCond: any = {
				[Op.or]: [
					Sequelize.literal(`shipment.id = ${getNumber(search)}`),
					Sequelize.literal(`shipment.order_id = ${getNumber(search)}`),
					Sequelize.literal(`shipment.customer_name ilike '%${escapeChars(search.toString())}%'`),
					Sequelize.literal(`shipment.origin_country ilike '%${escapeChars(search.toString())}%'`),
					Sequelize.literal(`shipment.customer_country ilike '%${escapeChars(search.toString())}%'`),
				],
			};
			whereClause = { ...whereClause, ...searchCond };
		}
		const { limit, offset } = getPagination(
			parseInt(page?.toString(), 10) || 0,
			parseInt(rowsPerPage?.toString(), 10) || 10
		);
		const shipmentInfo = await db.shipment.findAll({
			include: [
				{ model: db.cargo, attributes: { exclude: ['createdAt', 'updatedAt'] } },
				{ model: db.goods, attributes: { exclude: ['createdAt', 'updatedAt'] } },
				{ model: db.carrierCountryConfig, include: [{ model: db.carrier }], attributes: { exclude: ['createdAt', 'updatedAt'] } },
				{
					model: db.order,
					include: [{ model: db.deliveryMethod, nested: true, attributes: { exclude: ['createdAt', 'updatedAt'] } }],
					attributes: { exclude: ['createdAt', 'updatedAt'] }
				}
			],
			attributes: { exclude: ['createdAt', 'updatedAt'] },
			limit,
			offset,
			where: whereClause,
			order: [['id', 'desc']]
		});
		const totalCount = await db.shipment.count({
			where: whereClause
		});
		return res.status(200).json({ totalCount, shipment: shipmentInfo });
	} catch (error) {
		return next(error);
	}
}

export async function bookShipping(req: BookShipmentRequest, res: Response, next: NextFunction) {
	try {
		// const language = (String(req?.headers?.userlocale) === 'null' ? 'en' : String(req?.headers?.userlocale));
		const { newShipment } = req.body;
		const userId: number = req.user?.id;
		const order = await db.order.findOne({
			where: { webshopId: newShipment.orderId },
			attributes: { exclude: ['createdAt', 'updatedAt'] },
		});

		const companyInfo = {
			name: 'Wineandbarrels A/S',
			attention: 'Heidi',
			telephone: '71993344',
			email: 'info@wineandbarrels.com',
			address: 'Rønnevangsalle 8',
			address2: '',
			zipCode: '3400',
			town: 'Hillerød',
			country: 'DK',
			reference: newShipment.referenceNum,
			prefix: '+45',
		};

		let services = {};
		if (newShipment.carryIn) {
			services = { ...services, carryin: carryinCode };
			if (newShipment.twoMen) {
				services = { ...services, carryin2people: carryin2peopleCode };
			}
		}
		if (newShipment.assemblyAndIns) {
			services = { ...services, montering: monteringCode };
		}
		if (newShipment.dispOfGL) {
			services = { ...services, bortskaffelse: bortskaffelseCode };
		}

		const shipment = await db.shipment.create({
			orderId: order?.webshopId ?? newShipment.referenceNum,
			userId,
			carrierCountryConfigId: newShipment.freightForwarder.id,
			returnStatus: newShipment.returnShip,
			bookedDatetime: new Date(),
			originCompanyName: !newShipment.returnShip ? companyInfo.name : newShipment.customerInfo.company,
			originName: !newShipment.returnShip ? companyInfo.attention : newShipment.customerInfo.attention,
			originAddress: !newShipment.returnShip ? companyInfo.address : newShipment.customerInfo.address1,
			originExtraInfo: !newShipment.returnShip ? companyInfo.address2 : newShipment.customerInfo.address2,
			originZipCode: !newShipment.returnShip ? companyInfo.zipCode : newShipment.customerInfo.zipCode,
			originCity: !newShipment.returnShip ? companyInfo.town : newShipment.customerInfo.city,
			originCountry: !newShipment.returnShip ? companyInfo.country : newShipment.customerInfo.country,
			originEmail: !newShipment.returnShip ? companyInfo.email : newShipment.customerInfo.email,
			originPhonePrefix: !newShipment.returnShip ? companyInfo.prefix : newShipment.freightForwarder.country.telephoneCode?.toString(),
			originPhoneNumber: !newShipment.returnShip ? companyInfo.telephone : newShipment.customerInfo.mobile,
			originTimeWindowStart: newShipment.freightForwarder.showPickUp ? `${newShipment.pickupDate} ${newShipment.pickupTime?.split('-')[0]}` : null,
			originTimeWindowEnd: newShipment.freightForwarder.showPickUp ? `${newShipment.pickupDate} ${newShipment.pickupTime?.split('-')[1]}` : null,
			shipmentDate: newShipment.freightForwarder.showPickUp ? new Date(`${newShipment.pickupDate} ${newShipment.pickupTime?.split('-')[0]}`) : new Date(), // same as the pickup date
			companyName: newShipment.returnShip ? companyInfo.name : newShipment.customerInfo.company,
			customerName: newShipment.returnShip ? companyInfo.attention : newShipment.customerInfo.attention,
			customerAddress: newShipment.returnShip ? companyInfo.address : newShipment.customerInfo.address1,
			customerExtraAddress: newShipment.returnShip ? companyInfo.address2 : newShipment.customerInfo.address2,
			customerZipcode: newShipment.returnShip ? companyInfo.zipCode : newShipment.customerInfo.zipCode,
			customerCity: newShipment.returnShip ? companyInfo.town : newShipment.customerInfo.city,
			customerCountry: newShipment.returnShip ? companyInfo.country : newShipment.customerInfo.country,
			customerEmail: newShipment.returnShip ? companyInfo.email : newShipment.customerInfo.email,
			customerPhone: newShipment.returnShip ? companyInfo.telephone : newShipment.customerInfo.mobile,
			timeWindowStart: newShipment.freightForwarder.showDelivery ? new Date(`${newShipment.deliveryDate} ${newShipment.deliveryTime?.split('-')[0]}`) : null,
			timeWindowEnd: newShipment.freightForwarder.showDelivery ? new Date(`${newShipment.deliveryDate} ${newShipment.deliveryTime?.split('-')[1]}`) : null,
			deliveryInstruction: newShipment.deliveryInstruction,
			flexLiability: newShipment.flexDel,
			services: JSON.stringify(services),
			phoneNotification: newShipment.telNotf
		});

		const estateInfoPromises = newShipment.estateInfo.map(async (cargo: EstateInfo) => {
			logger.info(`estateInfo=${JSON.stringify(cargo)}`);
			const cargoModel = {
				shipmentId: shipment.id,
				amount: Number(cargo.quantity),
				description: cargo.item,
				width: Number(cargo.width),
				height: Number(cargo.height),
				depth: Number(cargo.depth),
				weight: Number(cargo.weight)
			};

			const result = await db.cargo.create(cargoModel);
			logger.info(`shipping cargo mapping record created successfully. id=${result.id}`);
			return result;
		});

		await Promise.all(estateInfoPromises);

		const goodsInfoPromises = newShipment.goodsInfo.map(async (goods: GoodsInfo) => {
			logger.info(`goodsInfo=${JSON.stringify(goods)}`);
			const goodsModel = {
				shipmentId: shipment.id,
				quantity: Number(goods.quantity),
				countryCode: goods.countryCode,
				itemNumber: goods.itemNumber,
				title: goods.item,
				customsCode: goods.customsCode,
				unitValue: Number(goods.value),
				weight: Number(goods.weight),
				currency: goods.currency,
			};

			const result = await db.goods.create(goodsModel);
			logger.info(`shipping goods mapping record created successfully. id=${result.id}`);
			return result;
		});

		await Promise.all(goodsInfoPromises);

		if (newShipment.freightForwarder.carrier.platform === 'Shipmondo') {
			await createBookingShipmondo(shipment.id);
		} else if (newShipment.freightForwarder.carrier.platform === 'Dropboy') {
			const platformId = await createBookingDropboy(shipment.id);
			if (platformId !== null) {
				getOrderDropBoyAndUpdateExternalInfo(shipment.id, shipment.orderId, platformId).then((status) => {
					if (status) {
						// send fresh desk email
						sendFreshdeskEmail(shipment.id);
					}
				});
			}
		}

		return res.status(200).json({
			isSuccess: true,
			shipmentId: shipment.id,
			message: 'Shipment created successfully'
		});
	} catch (error) {
		return next(error);
	}
}

export async function getOrderByWebshopIds(req: PrintOrderRequest, res: Response, next: NextFunction) {
	try {
		const { webshopIds } = req.query;
		// split webshopOrderIds into number array
		const webshopOrderIds = webshopIds?.toString().split(',').map((id) => Number(id));
		logger.debug(`Webshop order ids: ${JSON.stringify(webshopOrderIds)}`);
		const orderList = await db.order.findAll({
			where: {
				webshopId: { [Op.in]: webshopOrderIds }
			},
			include: [
				{ model: db.orderLine, include: [{ model: db.product }] },
				{ model: db.paymentMethod },
				{ model: db.orderStatus },
				{ model: db.customer },
				{ model: db.company },
				{ model: db.deliveryMethod }
			],
		});

		return res.status(200).json(orderList);
	} catch (error) {
		return next(error);
	}
}

export async function getCalculationPrice(req: CaculatePriceRequest, res: Response, next: NextFunction) {
	try {
		const { country, zipcode, quantity, length, width } = req.query;
		const runningMetre = ((length / 100) * (width / 100) * quantity) / 2.4;
		let postnordPrice = null;
		let skanlogPricePrice = null;
		const postnordShipmentPriceInstance = await db.shipmentPrice.findOne({
			include: [{ model: db.country }],
			where: Sequelize.and({ countryId: country },
				{ carrier: 'PDK' },
				{ minRunning: { [Op.lte]: runningMetre } },
				{ maxRunning: { [Op.gte]: runningMetre } },
				Sequelize.where(Sequelize.cast(Sequelize.col('"shipmentPrice"."min_zipcode"'), 'integer'), { [Op.lte]: zipcode }),
				Sequelize.where(Sequelize.cast(Sequelize.col('"shipmentPrice"."max_zipcode"'), 'integer'), { [Op.gte]: zipcode }))
		});

		if (postnordShipmentPriceInstance != null) {
			const postnordShipmentPrice = postnordShipmentPriceInstance.get() as unknown as CalculateShipmentPrice;
			const countryFixedPrice = [{
				carrierProduct: 'PDK_G',
				country: 'DK',
				Percentage: 0.17,
				fixed: 39,
			}, {
				carrierProduct: 'PDK_G',
				country: 'SE',
				Percentage: 0.17,
				fixed: 39,
			}, {
				carrierProduct: 'PDK_G',
				country: 'NO',
				Percentage: 0.17,
				fixed: 39,
			}];
			const countrySpecific = countryFixedPrice.filter((c) => c.carrierProduct === postnordShipmentPrice.carrierProduct && c.country === postnordShipmentPrice.country.countryCode);
			if (countrySpecific.length > 0) {
				postnordPrice = (postnordShipmentPrice.price * runningMetre * (1 + countrySpecific[0].Percentage)) + countrySpecific[0].fixed;
			}
		}

		const skanlogShipmentPrice = await db.shipmentPrice.findOne({
			include: [{ model: db.country }],
			where: Sequelize.and({ countryId: country },
				{ carrier: 'SKANLOG' },
				Sequelize.where(Sequelize.cast(Sequelize.col('"shipmentPrice"."min_zipcode"'), 'integer'), { [Op.lte]: zipcode }),
				Sequelize.where(Sequelize.cast(Sequelize.col('"shipmentPrice"."max_zipcode"'), 'integer'), { [Op.gte]: zipcode }))
		});
		if (skanlogShipmentPrice != null) {
			skanlogPricePrice = skanlogShipmentPrice.price;
		}

		return res.status(200).json({ runningMetre, postnordPrice, skanlogPricePrice });
	} catch (error) {
		return next(error);
	}
}

export async function getShipmentPriceCountries(req: Request, res: Response, next: NextFunction) {
	try {
		const countries = await db.country.findAll({
			include: [{ model: db.shipmentPrice, required: true }]
		});
		return res.status(200).json(countries.map((item) => { return { id: item.id, country: item.country, countryCode: item.countryCode }; }));
	} catch (error) {
		return next(error);
	}
}

export async function getTaricCodeText(req: TaricCodeRequest, res: Response, next: NextFunction) {
	try {
		const { code } = req.query;
		// removed spaces if present
		const tempCode = code?.replace(/\s/g, '');
		// format code with space after first 4 characters and after every 2nd character
		const formattedCode = `${tempCode.substring(0, 4)} ${tempCode.substring(4).match(/.{2}/g).join(' ')}`;
		return res.status(200).json({ text: taricCodes[formattedCode] ?? '' });
	} catch (error) {
		return next(error);
	}
}

export async function getAllTaricCodes(req: Request, res: Response, next: NextFunction) {
	try {
		// change key value to properties
		const response = Object.keys(taricCodes).map((key: string) => { return { code: key, text: taricCodes[key] }; });
		return res.status(200).json(response);
	} catch (error) {
		return next(error);
	}
}

export async function getShipmondoProducts(req: ShipmondoProductRequest, res: Response, next: NextFunction) {
	try {
		const { receiver, sender, ownagreements, carrier } = req.query;
		const result = await shipmondoGetProducts<ShipmondoProductCodeResponse>(receiver, sender, carrier);
		if (ownagreements !== null && ownagreements !== undefined) {
			const filteredResult = [];
			result.data.forEach((element) => {
				if (Boolean(element.own_agreement_available) === Boolean(ownagreements)) {
					filteredResult.push(element);
				}
			});

			return res.status(200).json(filteredResult);
		}
		return res.status(200).json(result.data);
	} catch (error) {
		return next(error);
	}
}

export async function getShipmondoCarriers(req: ShipmondoCarrierRequest, res: Response, next: NextFunction) {
	try {
		const { country } = req.query;
		const result = await shipmondoGetCarriers(country);
		return res.status(200).json(result.data);
	} catch (error) {
		return next(error);
	}
}
