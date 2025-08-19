const nodemailer = require('nodemailer');
const axios = require('axios');
const QuotationModal = require('../models/QuotationModel');

const JobModal = require('../models/JobModel');
const InvoiceModal = require('../models/InvoiceModel');

const moment = require('moment/moment')
var converter = require('number-to-words');
const pdf = require('html-pdf');


module.exports = {
    sentMail: async (id, type = 'new', memail = "", memailcc = "") => {
        try {

            // const id = req.params.id

            let result = await QuotationModal.getQuotationMailData(id);

            let urlDomain = true ? "https://mycseworldwide.com.my/quotation-confirm/" + id : "http://localhost:3000/quotation-confirm/" + id;

            let htmlContent = `<html>
<head>
    <title>CSE World Wide | Logistics Made Simple</title>
    <style>
        .container {
            width: 900px;
            margin: 10px auto;
            font-family: arial;
            font-size:  14px;
            color: #6e6b7b;
            line-height: 1.5rem;
            letter-spacing: 0.01rem;
        }
        .row {
            display: flex;
            flex-wrap: wrap;
        }
        .col-12 {
            width: 97%;
            padding: 10px 15px;
            border: 1px solid silver;
        }
        .col-6 {
            width: 48%;
            padding: 10px;
            border: 1px solid silver;
        }
        .col-3{
            width: 23%;
            padding: 10px 11px;
            border: 1px solid silver;
        }
        .col-4 {
            width: 26%;
            padding: 10px;
            border: 1px solid silver;
        }
        .col-8 {
            width: 70%;
            padding: 10px;
            border: 1px solid silver;
        }
        table{
            font-family: arial;
            font-size:  14px;
            color: #6e6b7b;
            line-height: 1.5rem;
            letter-spacing: 0.01rem;
            width: 100%
        }
        table, tr, td{
            border: 1px solid silver;
        }
        td{
            padding: 10px;
        }
    </style>
</head>

<body>
    <div class="container">
        <table>
            <tr>
                <td style="text-align: center; width: 30%;">
                    <img src="https://www.growsofttechnologies.com/mail/cse-logo.png" style="width: 80%;">
                </td>
                <td colspan="3" style="text-align: center;line-height: 15px;font-size: 11px;">
                    <h1>Centre Side Express Sdn Bhd</h1>
                    (627079-D)<br>
                    D-7-2, Blok D, Tingkat 7, Megan Avenue 1, Jalan Mayang Sari, Hampshire Park<br>
                    50450 Kuala Lumpur , Malaysia<br>
                    Tel : 03-977 20715 EMAIL : finance@cseworldwide.com.my<br>
                    SST ID: A10-1809-32000078<br>
                </td>
            </tr>
            <tr>
                <td  colspan="4" style="text-align: center;">
                    <h2 style="text-decoration: underline;">Quotation</h2>
                </td>
            </tr>
            <tr>
                <td colspan="2" style="width: 50%;">
                    <b>CUSTOMER NAME & ADDRESS:</b><br>
                    <b>`+ result?.cname + `</b><br>
                    `+ result?.address + `
                </td>
                <td colspan="2" style="width: 50%;">
                    <b>Quotation ID :</b> `+ result?.quote_id + `<br>
                    <b>Quotation Date : </b> `+ moment(new Date(result?.created_on)).format('DD-MM-YYYY') + `<br>
                    <b>Quotation Time : </b> `+ moment(new Date(result?.created_on)).format('h:mm:ss a') + `    <br>
                </td>
            </tr>
            <tr>
                <td>
                    <b>Quote Created in:</b><br>
                    `+ result?.quote_created_in + `
                </td>
                <td>
                    <b>Job Belong to:</b><br>
                    `+ result?.job_belong_to + `
                </td>
                <td>
                    <b>Type of Quotation:</b><br>
                    `+ result?.type_of_quotation + `
                </td>
                <td>
                    <b>Job Classification: </b><br>
                    `+ result?.job_classification + `
                </td>
            </tr>
            <tr>
                <td>
                    <b>Quotation Date:</b><br>
                    `+ moment(new Date(result?.quote_date)).format('DD-MM-YYYY') + `
                </td>
                <td>
                    <b>Due Date:</b><br>
                    `+ moment(new Date(result?.due_date)).format('DD-MM-YYYY') + `
                </td>
                <td colspan="2" style="width: 50%;">
                    <b>Billing Entry:</b><br>
                    `+ result?.billing_entry + `
                </td>
            </tr>
            <tr>
                <td>
                    <b>Subject:</b><br>
                    `+ result?.subject + `
                </td>
                <td>
                    <b>Payment Term:</b><br>
                    `+ result?.payment_term + `
                </td>
                <td colspan="2" style="width: 50%;">
                    <b>Currency:</b><br>
                    `+ result?.currency + `
                </td>
            </tr>
            <tr>
                <td style="width: 30%;">
                    <b>S/L No</b>
                </td>
                <td colspan="2">
                    <b>Discription</b>
                </td>
                <td style="width: 30%;">
                    <b>Amount</b>
                </td>
            </tr>`;

            result?.product.forEach(element => {
                htmlContent += `<tr>
                <td style="width: 30%;">
                    `+ element?.id + `
                </td>
                <td colspan="2">
                    `+ element?.desc + `
                </td>
                <td style="width: 30%;text-align: right;">
                    `+ element?.amount + `
                </td>
            </tr>`;
            });


            htmlContent += `<tr>
                
                <td colspan="2" rowspan="2" style="width: 50%;">
                    <b>AMOUNT IN WORDS:</b><br>
                    `+ converter.toWords(result?.total) + `
                </td>
                <td style="width: 30%;">
                    <b>Sub Total:</b>
                </td>
                <td style="width: 30%;text-align: right;">
                    `+ result?.total + `
                </td>
            </tr>
            <tr>
                <td style="width: 30%;">
                    <b>SST Tax:</b>
                </td>
                <td style="width: 30%;text-align: right;">
                    0
                </td>
            </tr>
            <tr>
                <td colspan="2" style="width: 50%;">
                </td>
                <td style="width: 30%;">
                    <b>Gross Total:</b>
                </td>
                <td style="width: 30%;text-align: right;">
                    `+ result?.total + `
                </td>
            </tr>
            <tr>
                <td colspan="4">
                    <b>Marketing Person</b>
                </td>
            </tr>
            <tr>
                <td colspan="4">
                    <b>Terms of Sale : </b><br>
                    <ol>
                        <li>Goods once ordered & manufactured will not be taken back or exchanged or redirected</li>
                        <li>Any claim/shortfall/wastages due to operations shall not be accepted, if not claimed, on the same day/date of supply with proper note</li>
                        <li>We will not entertain any claims after 35 days from the date of supply</li>
                        <li>Interest @ 24% p.a. is applicable on outstanding amount, which crosses more than the agreed payment terms</li>
                        <li>All payments should be made only through account payee cheques/ draft/rtgs in favour of "Sai concrete"</li>
                    </ol>
                </td>
            </tr>
             <tr>
                <td colspan="4">
                    <b>Note : </b><br>
                    `
            htmlContent += result?.note;
            htmlContent += `</td>
            </tr>
            <tr>
                <td colspan="2" style="width: 50%;">
                    <b>Receiver Name :</b><br>
                    <b>Date :</b><br>
                    <div style="text-align: center;width: 100%;margin-top: 50px;">Receiver Signatory</div>
                </td>
                <td colspan="2" style="width: 50%;">
                    <br>
                    <br>
                    <div style="text-align: center;width: 100%;margin-top: 50px;">Authorized Signatory</div>
                </td>
            </tr>
            <tr>
                <td colspan="4" style="text-align: center;">
                    This <b>Quotation</b> is computer generated and no signature is required
                </td>
            </tr>`

            htmlContent += `</table>
    </div>
</body>

</html>`;

            // Generate PDF from HTML content
            let fileName = 'quotation_' + result?.id + '_' + moment().format('YYYY_MM_DD_HH_mm_ss') + '.pdf';
            let filePath = './attachment/' + moment().format('YYYY-MM-DD') + '/' + fileName;
            // pdf.create(htmlContent).toFile(filePath, function (err, res) {
            //     if (err) return console.log(err);
            //     console.log(res); // { filename: '/path/to/example.pdf' }

            // Create a transporter object using Gmail service
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                port: 587,
                auth: {
                    // user: 'clickytl@gmail.com',
                    // pass: 'fspk qcra mjci nqsz',
                    user: 'cseworld247@gmail.com',
                    pass: 'scok uggp uvmj pssn',
                },
            });

            let mailSubject = "Your Quotation is Ready! " + result?.quote_id + " : " + result?.subject
            let mailContent = 'Dear ' + result?.cname + ', <br><br>I hope this email finds you well. <br><br>I am writing to inform you that your requested quotation has been prepared and is attached to this email for your review. Please let me know if you have any questions or require further clarification. '
            if (type == 'new') {
                mailSubject = "Your Quotation is Ready! " + result?.quote_id + " : " + result?.subject
                mailContent = 'Dear ' + result?.cname + ', <br><br>I hope this email finds you well. <br><br>I am writing to inform you that your requested quotation has been prepared and is attached to this email for your review. Please let me know if you have any questions or require further clarification. '
                mailContent += '<br><br>Click below to confirm quotation :<br> ' + urlDomain
            } else if (type == 'resend') {
                mailSubject = "Your Quotation is re-shared! " + result?.quote_id + " : " + result?.subject
                mailContent = 'Dear ' + result?.cname + ', <br><br>I hope this email finds you well. <br><br>I am writing to inform you that your requested quotation has been prepared and is attached to this email for your review. Please let me know if you have any questions or require further clarification. '
            } else if (result?.c_status != 'Confirmed') {
                mailSubject = "Your Quotation is Updated! " + result?.quote_id + " : " + result?.subject
                mailContent += '<br><br>Click below to confirm quotation :<br> ' + urlDomain
            }
            mailContent += '<br><br>We look forward to the opportunity to work with you on this project. <br><br>Sincerely,  <br>CSE Support Team'

                // Define the email options
                const mailOptions = {
                    from: 'cse-support@gmail.com',
                    to: memail != '' ? memail : result?.cemail,
                  	cc: memailcc != '' ? memailcc : '',
                    subject: mailSubject,
                    html: mailContent+htmlContent,
                    // attachments: [
                    //     {
                    //         filename: fileName,
                    //         path: filePath, // Path to your local PDF file
                    //         contentType: 'application/pdf' // MIME type for PDF
                    //     }
                    // ]
                };
                  
                  //console.log("mailOptions",mailOptions)

            let data = [];

                // Send the email
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                      	let resultEmail = QuotationModal.saveEmailHistory(id, memail != '' ? memail : result?.cemail, memailcc, 'Failed');
                        console.log('Error: ' + error);

                    data["status"] = 500;
                    data["message"] = error;
                    data["data"] = [];

                    // return res.status(500).json(data);
                    return data;
                }

                    console.log('Email sent: ' + info.response);
                  
                  	let resultEmail = QuotationModal.saveEmailHistory(id, memail != '' ? memail : result?.cemail, memailcc, 'Sent');

                // Data responce

                data["status"] = 200;
                data["message"] = "Email sent successfully";
                data["data"] = info.response;

                console.log("data", data)

                return data;
            });
            // });


            // return htmlContent;

            // console.log("demo ====>>>",htmlContent)


        } catch (error) {
            console.log("Error ==>>", error)
        }
    },
    sentMailJob: async (id, status = true) => {
        try {

            // const id = req.params.id

            let result = await JobModal.getJobMailData(id);

            let urlDomain = true ? "https://fleet360.koolschoolerp.com/quotation-confirm/" + id : "http://localhost:3000/quotation-confirm/" + id;

            let htmlContent = `<html>
<head>
    <title>CSE World Wide | Logistics Made Simple</title>
    <style>
        .container {
            width: 900px;
            margin: 10px auto;
            font-family: arial;
            font-size:  14px;
            color: #6e6b7b;
            line-height: 1.5rem;
            letter-spacing: 0.01rem;
        }
        .row {
            display: flex;
            flex-wrap: wrap;
        }
        .col-12 {
            width: 97%;
            padding: 10px 15px;
            border: 1px solid silver;
        }
        .col-6 {
            width: 48%;
            padding: 10px;
            border: 1px solid silver;
        }
        .col-3{
            width: 23%;
            padding: 10px 11px;
            border: 1px solid silver;
        }
        .col-4 {
            width: 26%;
            padding: 10px;
            border: 1px solid silver;
        }
        .col-8 {
            width: 70%;
            padding: 10px;
            border: 1px solid silver;
        }
        table{
            font-family: arial;
            font-size:  14px;
            color: #6e6b7b;
            line-height: 1.5rem;
            letter-spacing: 0.01rem;
            width: 100%
        }
        table, tr, td{
            border: 1px solid silver;
        }
        td{
            padding: 10px;
        }
    </style>
</head>

<body>
    <div class="container">
        <table>
            <tr>
                <td style="text-align: center; width: 30%;">
                    <img src="https://www.growsofttechnologies.com/mail/cse-logo.png" style="width: 80%;">
                </td>
                <td colspan="3" style="text-align: center;line-height: 15px;font-size: 11px;">
                    <h1>Centre Side Express Sdn Bhd</h1>
                    (627079-D)<br>
                    D-7-2, Blok D, Tingkat 7, Megan Avenue 1, Jalan Mayang Sari, Hampshire Park<br>
                    50450 Kuala Lumpur , Malaysia<br>
                    Tel : 03-977 20715 EMAIL : finance@cseworldwide.com.my<br>
                    SST ID: A10-1809-32000078<br>
                </td>
            </tr>
            <tr>
                <td  colspan="4" style="text-align: center;">
                    <h2 style="text-decoration: underline;">Job</h2>
                </td>
            </tr>
            <tr>
                <td colspan="2" style="width: 50%;">
                    <b>CUSTOMER NAME & ADDRESS:</b><br>
                    <b>`+ result?.cname + `</b><br>
                    `+ result?.address + `
                </td>
                <td colspan="2" style="width: 50%;">
                    <b>Job ID :</b> `+ result?.quote_id + `<br>
                    <b>Job Date : </b> `+ moment(new Date(result?.created_on)).format('DD-MM-YYYY') + `<br>
                    <b>Job Time : </b> `+ moment(new Date(result?.created_on)).format('h:mm:ss a') + `    <br>
                </td>
            </tr>
            <tr>
                <td>
                    <b>Quote Created in:</b><br>
                    `+ result?.quote_created_in + `
                </td>
                <td>
                    <b>Job Belong to:</b><br>
                    `+ result?.job_belong_to + `
                </td>
                <td>
                    <b>Type of Quotation:</b><br>
                    `+ result?.type_of_quotation + `
                </td>
                <td>
                    <b>Job Classification: </b><br>
                    `+ result?.job_classification + `
                </td>
            </tr>
            <tr>
                <td>
                    <b>Quotation Date:</b><br>
                    `+ moment(new Date(result?.quote_date)).format('DD-MM-YYYY') + `
                </td>
                <td>
                    <b>Due Date:</b><br>
                    `+ moment(new Date(result?.due_date)).format('DD-MM-YYYY') + `
                </td>
                <td colspan="2" style="width: 50%;">
                    <b>Billing Entry:</b><br>
                    `+ result?.billing_entry + `
                </td>
            </tr>
            <tr>
                <td>
                    <b>Subject:</b><br>
                    `+ result?.subject + `
                </td>
                <td>
                    <b>Payment Term:</b><br>
                    `+ result?.payment_term + `
                </td>
                <td colspan="2" style="width: 50%;">
                    <b>Currency:</b><br>
                    `+ result?.currency + `
                </td>
            </tr>
            <tr>
                <td style="width: 30%;">
                    <b>S/L No</b>
                </td>
                <td colspan="2">
                    <b>Discription</b>
                </td>
                <td style="width: 30%;">
                    <b>Amount</b>
                </td>
            </tr>`;

            result?.product.forEach(element => {
                htmlContent += `<tr>
                <td style="width: 30%;">
                    `+ element?.id + `
                </td>
                <td colspan="2">
                    `+ element?.desc + `
                </td>
                <td style="width: 30%;text-align: right;">
                    `+ element?.amount + `
                </td>
            </tr>`;
            });


            htmlContent += `<tr>
                
                <td colspan="2" rowspan="2" style="width: 50%;">
                    <b>AMOUNT IN WORDS:</b><br>
                    `+ converter.toWords(result?.total) + `
                </td>
                <td style="width: 30%;">
                    <b>Sub Total:</b>
                </td>
                <td style="width: 30%;text-align: right;">
                    `+ result?.total + `
                </td>
            </tr>
            <tr>
                <td style="width: 30%;">
                    <b>SST Tax:</b>
                </td>
                <td style="width: 30%;text-align: right;">
                    0
                </td>
            </tr>
            <tr>
                <td colspan="2" style="width: 50%;">
                </td>
                <td style="width: 30%;">
                    <b>Gross Total:</b>
                </td>
                <td style="width: 30%;text-align: right;">
                    `+ result?.total + `
                </td>
            </tr>
            <tr>
                <td colspan="4">
                    <b>Marketing Person</b>
                </td>
            </tr>
            <tr>
                <td colspan="4">
                    <b>Terms of Sale : </b><br>
                    <ol>
                        <li>Goods once ordered & manufactured will not be taken back or exchanged or redirected</li>
                        <li>Any claim/shortfall/wastages due to operations shall not be accepted, if not claimed, on the same day/date of supply with proper note</li>
                        <li>We will not entertain any claims after 35 days from the date of supply</li>
                        <li>Interest @ 24% p.a. is applicable on outstanding amount, which crosses more than the agreed payment terms</li>
                        <li>All payments should be made only through account payee cheques/ draft/rtgs in favour of "Sai concrete"</li>
                    </ol>
                </td>
            </tr>
             <tr>
                <td colspan="4">
                    <b>Note : </b><br>
                    `
            htmlContent += result?.note;
            htmlContent += `</td>
            </tr>
            <tr>
                <td colspan="2" style="width: 50%;">
                    <b>Receiver Name :</b><br>
                    <b>Date :</b><br>
                    <div style="text-align: center;width: 100%;margin-top: 50px;">Receiver Signatory</div>
                </td>
                <td colspan="2" style="width: 50%;">
                    <br>
                    <br>
                    <div style="text-align: center;width: 100%;margin-top: 50px;">Authorized Signatory</div>
                </td>
            </tr>
            <tr>
                <td colspan="4" style="text-align: center;">
                    This <b>Quotation</b> is computer generated and no signature is required
                </td>
            </tr>`

            htmlContent += `</table>
    </div>
</body>

</html>`;

            // Generate PDF from HTML content
            let fileName = 'quotation_' + result?.id + '_' + moment().format('YYYY_MM_DD_HH_mm_ss') + '.pdf';
            let filePath = './attachment/' + moment().format('YYYY-MM-DD') + '/' + fileName;
            // pdf.create(htmlContent).toFile(filePath, function (err, res) {
            //     if (err) return console.log(err);
            //     console.log(res); // { filename: '/path/to/example.pdf' }

            // Create a transporter object using Gmail service
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                port: 587,
                auth: {
                    // user: 'clickytl@gmail.com',
                    // pass: 'fspk qcra mjci nqsz',
                    user: 'cseworld247@gmail.com',
                    pass: 'scok uggp uvmj pssn',
                },
            });

            let mailSubject = "Job for " + result?.quote_id + " : " + result?.subject
            let mailContent = 'Dear ' + result?.cname + ', <br><br>I hope this email finds you well. <br><br>I am writing to inform you that your requested job has been prepared and is attached to this email for your review. Please let me know if you have any questions or require further clarification. '

            mailContent += '<br><br>We look forward to the opportunity to work with you on this project. <br><br>Sincerely,  <br>CSE Support Team'

            // Define the email options
            const mailOptions = {
                from: 'cse-support@gmail.com',
                to: result?.cemail,
                subject: mailSubject,
                html: mailContent + htmlContent,
                // text: mailContent,
                // attachments: [
                //     {
                //         filename: fileName,
                //         path: filePath, // Path to your local PDF file
                //         contentType: 'application/pdf' // MIME type for PDF
                //     }
                // ]
            };

            let data = [];

            // Send the email
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log('Error: ' + error);

                    data["status"] = 500;
                    data["message"] = error;
                    data["data"] = [];

                    // return res.status(500).json(data);
                    return data;
                }

                console.log('Email sent: ' + info.response);

                // Data responce

                data["status"] = 200;
                data["message"] = "Email sent successfully";
                data["data"] = info.response;

                console.log("data", data)

                return data;
            });
            // });


            // return htmlContent;

            // console.log("demo ====>>>",htmlContent)


        } catch (error) {
            console.log("Error ==>>", error)
        }
    },
    sentMailInvoice: async (id, status = true) => {
        try {

            // const id = req.params.id

            let result = await InvoiceModal.getJobMailData(id);

            let urlDomain = true ? "https://fleet360.koolschoolerp.com/quotation-confirm/" + id : "http://localhost:3000/quotation-confirm/" + id;

            let htmlContent = `<html>
<head>
    <title>CSE World Wide | Logistics Made Simple</title>
    <style>
        .container {
            width: 900px;
            margin: 10px auto;
            font-family: arial;
            font-size:  14px;
            color: #6e6b7b;
            line-height: 1.5rem;
            letter-spacing: 0.01rem;
        }
        .row {
            display: flex;
            flex-wrap: wrap;
        }
        .col-12 {
            width: 97%;
            padding: 10px 15px;
            border: 1px solid silver;
        }
        .col-6 {
            width: 48%;
            padding: 10px;
            border: 1px solid silver;
        }
        .col-3{
            width: 23%;
            padding: 10px 11px;
            border: 1px solid silver;
        }
        .col-4 {
            width: 26%;
            padding: 10px;
            border: 1px solid silver;
        }
        .col-8 {
            width: 70%;
            padding: 10px;
            border: 1px solid silver;
        }
        table{
            font-family: arial;
            font-size:  14px;
            color: #6e6b7b;
            line-height: 1.5rem;
            letter-spacing: 0.01rem;
            width: 100%
        }
        table, tr, td{
            border: 1px solid silver;
        }
        td{
            padding: 10px;
        }
    </style>
</head>

<body>
    <div class="container">
        <table>
            <tr>
                <td style="text-align: center; width: 30%;">
                    <img src="https://www.growsofttechnologies.com/mail/cse-logo.png" style="width: 80%;">
                </td>
                <td colspan="3" style="text-align: center;line-height: 15px;font-size: 11px;">
                    <h1>Centre Side Express Sdn Bhd</h1>
                    (627079-D)<br>
                    D-7-2, Blok D, Tingkat 7, Megan Avenue 1, Jalan Mayang Sari, Hampshire Park<br>
                    50450 Kuala Lumpur , Malaysia<br>
                    Tel : 03-977 20715 EMAIL : finance@cseworldwide.com.my<br>
                    SST ID: A10-1809-32000078<br>
                </td>
            </tr>
            <tr>
                <td  colspan="4" style="text-align: center;">
                    <h2 style="text-decoration: underline;">Invoice</h2>
                </td>
            </tr>
            <tr>
                <td colspan="2" style="width: 50%;">
                    <b>CUSTOMER NAME & ADDRESS:</b><br>
                    <b>`+ result?.cname + `</b><br>
                    `+ result?.address + `
                </td>
                <td colspan="2" style="width: 50%;">
                    <b>Invoice ID :</b> `+ result?.quote_id + `<br>
                    <b>Invoice Date : </b> `+ moment(new Date(result?.created_on)).format('DD-MM-YYYY') + `<br>
                    <b>Invoice Time : </b> `+ moment(new Date(result?.created_on)).format('h:mm:ss a') + `    <br>
                </td>
            </tr>
            <tr>
                <td>
                    <b>Quote Created in:</b><br>
                    `+ result?.quote_created_in + `
                </td>
                <td>
                    <b>Job Belong to:</b><br>
                    `+ result?.job_belong_to + `
                </td>
                <td>
                    <b>Type of Quotation:</b><br>
                    `+ result?.type_of_quotation + `
                </td>
                <td>
                    <b>Job Classification: </b><br>
                    `+ result?.job_classification + `
                </td>
            </tr>
            <tr>
                <td>
                    <b>Quotation Date:</b><br>
                    `+ moment(new Date(result?.quote_date)).format('DD-MM-YYYY') + `
                </td>
                <td>
                    <b>Due Date:</b><br>
                    `+ moment(new Date(result?.due_date)).format('DD-MM-YYYY') + `
                </td>
                <td colspan="2" style="width: 50%;">
                    <b>Billing Entry:</b><br>
                    `+ result?.billing_entry + `
                </td>
            </tr>
            <tr>
                <td>
                    <b>Subject:</b><br>
                    `+ result?.subject + `
                </td>
                <td>
                    <b>Payment Term:</b><br>
                    `+ result?.payment_term + `
                </td>
                <td colspan="2" style="width: 50%;">
                    <b>Currency:</b><br>
                    `+ result?.currency + `
                </td>
            </tr>
            <tr>
                <td style="width: 30%;">
                    <b>S/L No</b>
                </td>
                <td colspan="2">
                    <b>Discription</b>
                </td>
                <td style="width: 30%;">
                    <b>Amount</b>
                </td>
            </tr>`;

            result?.product.forEach(element => {
                htmlContent += `<tr>
                <td style="width: 30%;">
                    `+ element?.id + `
                </td>
                <td colspan="2">
                    `+ element?.desc + `
                </td>
                <td style="width: 30%;text-align: right;">
                    `+ element?.amount + `
                </td>
            </tr>`;
            });


            htmlContent += `<tr>
                
                <td colspan="2" rowspan="2" style="width: 50%;">
                    <b>AMOUNT IN WORDS:</b><br>
                    `+ converter.toWords(result?.total) + `
                </td>
                <td style="width: 30%;">
                    <b>Sub Total:</b>
                </td>
                <td style="width: 30%;text-align: right;">
                    `+ result?.total + `
                </td>
            </tr>
            <tr>
                <td style="width: 30%;">
                    <b>SST Tax:</b>
                </td>
                <td style="width: 30%;text-align: right;">
                    0
                </td>
            </tr>
            <tr>
                <td colspan="2" style="width: 50%;">
                </td>
                <td style="width: 30%;">
                    <b>Gross Total:</b>
                </td>
                <td style="width: 30%;text-align: right;">
                    `+ result?.total + `
                </td>
            </tr>
            <tr>
                <td colspan="4">
                    <b>Marketing Person</b>
                </td>
            </tr>
            <tr>
                <td colspan="4">
                    <b>Terms of Sale : </b><br>
                    <ol>
                        <li>Goods once ordered & manufactured will not be taken back or exchanged or redirected</li>
                        <li>Any claim/shortfall/wastages due to operations shall not be accepted, if not claimed, on the same day/date of supply with proper note</li>
                        <li>We will not entertain any claims after 35 days from the date of supply</li>
                        <li>Interest @ 24% p.a. is applicable on outstanding amount, which crosses more than the agreed payment terms</li>
                        <li>All payments should be made only through account payee cheques/ draft/rtgs in favour of "Sai concrete"</li>
                    </ol>
                </td>
            </tr>
            <tr>
                <td colspan="4">
                    <b>Note : </b><br>
                    `
            htmlContent += result?.note;
            htmlContent += `</td>
            </tr>
            <tr>
                <td colspan="2" style="width: 50%;">
                    <b>Receiver Name :</b><br>
                    <b>Date :</b><br>
                    <div style="text-align: center;width: 100%;margin-top: 50px;">Receiver Signatory</div>
                </td>
                <td colspan="2" style="width: 50%;">
                    <br>
                    <br>
                    <div style="text-align: center;width: 100%;margin-top: 50px;">Authorized Signatory</div>
                </td>
            </tr>
            <tr>
                <td colspan="4" style="text-align: center;">
                    This <b>Quotation</b> is computer generated and no signature is required
                </td>
            </tr>`

            htmlContent += `</table>
    </div>
</body>

</html>`;

            // Generate PDF from HTML content
            let fileName = 'quotation_' + result?.id + '_' + moment().format('YYYY_MM_DD_HH_mm_ss') + '.pdf';
            let filePath = './attachment/' + moment().format('YYYY-MM-DD') + '/' + fileName;
            // pdf.create(htmlContent).toFile(filePath, function (err, res) {
            //     if (err) return console.log(err);
            //     console.log(res); // { filename: '/path/to/example.pdf' }

            // Create a transporter object using Gmail service
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                port: 587,
                auth: {
                    // user: 'clickytl@gmail.com',
                    // pass: 'fspk qcra mjci nqsz',
                    user: 'cseworld247@gmail.com',
                    pass: 'scok uggp uvmj pssn',
                },
            });

            let mailSubject = "Invoice for " + result?.quote_id + " : " + result?.subject
            let mailContent = 'Dear ' + result?.cname + ', <br><br>I hope this email finds you well. <br><br>Please let me know if you have any questions or require further clarification. '

            mailContent += '<br><br>We look forward to the opportunity to work with you on this project. <br><br>Sincerely,  <br>CSE Support Team'

            // Define the email options
            const mailOptions = {
                from: 'cse-support@gmail.com',
                to: result?.cemail,
                subject: mailSubject,
                html: mailContent + htmlContent,
                // text: mailContent,
                // attachments: [
                //     {
                //         filename: fileName,
                //         path: filePath, // Path to your local PDF file
                //         contentType: 'application/pdf' // MIME type for PDF
                //     }
                // ]
            };

            let data = [];

            // Send the email
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log('Error: ' + error);

                    data["status"] = 500;
                    data["message"] = error;
                    data["data"] = [];

                    // return res.status(500).json(data);
                    return data;
                }

                console.log('Email sent: ' + info.response);

                // Data responce

                data["status"] = 200;
                data["message"] = "Email sent successfully";
                data["data"] = info.response;

                console.log("data", data)

                return data;
            });
            // });


            // return htmlContent;

            // console.log("demo ====>>>",htmlContent)


        } catch (error) {
            console.log("Error ==>>", error)
        }
    },
}