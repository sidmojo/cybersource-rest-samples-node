'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function AuthenticationWithNewAccount(callback) {
	try {
			var configObject = new configuration();
			var instance = new cybersourceRestApi.PayerAuthenticationApi(configObject);

			var clientReferenceInformation = new cybersourceRestApi.Riskv1authenticationsClientReferenceInformation();
			clientReferenceInformation.code = 'New Account';

			var card = new cybersourceRestApi.Riskv1authenticationsPaymentInformationCard();
			card.number = '4000990000000004';
			card.expirationMonth = '12';
			card.expirationYear = '2025';
			card.type = '001';
	    
			var paymentInformation = new cybersourceRestApi.Riskv1authenticationsPaymentInformation();
			paymentInformation.card = card;

			var amountDetails = new cybersourceRestApi.Riskv1decisionsOrderInformationAmountDetails();
			amountDetails.currency = 'USD';
			amountDetails.totalAmount = '10.99';


			var billTo = new cybersourceRestApi.Riskv1authenticationsOrderInformationBillTo();
			billTo.address1 = '1 Market St';
			billTo.address2 = 'Address 2';
			billTo.administrativeArea = 'CA';
			billTo.country = 'US';
			billTo.locality = 'san francisco';
			billTo.firstName = 'James';
			billTo.lastName = 'Doe';
			billTo.phoneNumber = '4158880000';
			billTo.email = 'test@cybs.com';
			billTo.postalCode = '94105';    

			var orderInformation = new cybersourceRestApi.Riskv1authenticationsOrderInformation();
			orderInformation.amountDetails = amountDetails;
			orderInformation.billTo = billTo;

			var consumerAuthenticationInformation = new cybersourceRestApi.Riskv1authenticationsConsumerAuthenticationInformation();
			consumerAuthenticationInformation.transactionMode = 'MOTO';

			var customerAccount = new cybersourceRestApi.Riskv1authenticationsRiskInformationBuyerHistoryCustomerAccount();
			customerAccount.creationHistory = 'NEW_ACCOUNT';

			var accountHistory = new cybersourceRestApi.Riskv1authenticationsRiskInformationBuyerHistoryAccountHistory();
			accountHistory.shipAddressUsageDate = '2017-05-06';
			accountHistory.firstUseOfShippingAddress = 'false';
							
			var buyerHistory = new cybersourceRestApi.Riskv1authenticationsRiskInformationBuyerHistory();
			buyerHistory.customerAccount = customerAccount;
			buyerHistory.accountHistory = accountHistory;

			var riskInformation = new cybersourceRestApi.Riskv1authenticationsRiskInformation();
			riskInformation.buyerHistory = buyerHistory;
	
			var request = new cybersourceRestApi.CheckPayerAuthEnrollmentRequest();
			request.clientReferenceInformation = clientReferenceInformation;
			request.paymentInformation = paymentInformation;
			request.orderInformation = orderInformation;
			request.consumerAuthenticationInformation = consumerAuthenticationInformation;
			request.riskInformation = riskInformation;

	    console.log('\n*************** AuthenticationWithNewAccount ********************* ');

			instance.checkPayerAuthEnrollment(request, function (error, data, response) {
				if (error) {
					console.log('\nError in AuthenticationWithNewAccount : ' + JSON.stringify(error));
				}
				else if (data) {
					console.log('\nData of AuthenticationWithNewAccount : ' + JSON.stringify(data));
				}
				console.log('\nResponse of AuthenticationWithNewAccount : ' + JSON.stringify(response));
				console.log('\nResponse Code of AuthenticationWithNewAccount : ' + JSON.stringify(response['status']));
				callback(error, data);
			});
		} catch (error) {
			console.log(error);
		}
}

if (require.main === module) {
	AuthenticationWithNewAccount(function () {
		console.log('\AuthenticationWithNewAccount end.');
	}, false);
}
module.exports.AuthenticationWithNewAccount = AuthenticationWithNewAccount;