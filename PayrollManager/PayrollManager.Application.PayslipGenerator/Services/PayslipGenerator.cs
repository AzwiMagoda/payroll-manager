using Firebase.Storage;
using iText.Html2pdf;
using iText.Kernel.Pdf;
using PayrollManager.Application.PayslipGenerator.Dto;
using PayrollManager.Application.PayslipGenerator.Interfaces;
using System;
using System.IO;

namespace PayrollManager.Application.PayslipGenerator.Services
{
    public class PayslipGenerator : IPayslipGenerator
    {
        private const string BASE_PATH = @".\temp";

        public PayslipGenerator()
        {
        }

        public void GeneratePayslipPdf(Payslip payslip)
        {
            var date = DateTime.Today.Date.ToString("ddMMMMyyyy");
            var fileName = $"{payslip.Id}_payslip_{date}";
            var pdfPath = @$"{BASE_PATH}\{fileName}.pdf";

            string html = $"<body> <div style = 'color:blue;text-align:center;'><h2> Payslip </h2> <h4> Company Name </h4> <h6> Company Address </h6> </div> " +
                $"<div style = 'margin: auto; width: 90%;'> <div style = 'float:left;'> <p> Employee Name: {payslip.Name} </p> <p> Identity Number: {payslip.IdentityNumber} </p> " +
                $"<p> Gender: {payslip.Gender} </p> <p> Tax Number: {payslip.TaxNumber} </p> </div> <div style = 'float:left; margin-left: 20%'> <p> Job Title: {payslip.Jobtitle} <p> " +
                $"Depatment: {payslip.Department} </p> <p> Pay Period: {DateTime.Today.Date.ToShortDateString()} </p> <p> Start Date: {payslip.StartDate.Date.ToShortDateString()} </p> </div> </div> </body>";

            //Convert to pdf
            HtmlConverter.ConvertToPdf(html, new PdfWriter(pdfPath));

            //upload
            UploadPayslipToFirebase(pdfPath, fileName);
        }

        public async void UploadPayslipToFirebase(string filePath, string fileName)
        {
            var stream = File.Open(filePath, FileMode.Open);

            // Construct FirebaseStorage with path to where you want to upload the file and put it there
            var task = new FirebaseStorage("payroll-manager-a6c44.appspot.com")
             .Child("payslips")
             .Child(fileName)
             .PutAsync(stream);

            // Await the task to wait until upload is completed and get the download url
            var downloadUrl = await task;

            System.Diagnostics.Debug.WriteLine(downloadUrl);
        }
    }
}
