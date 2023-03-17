import React from "react";
import { jsPDF } from "jspdf";
import { Button, Container } from "@mui/material";
import { calculateBMI, convertToFeet, nameParser, parseHeightCm } from "./CommonUtility";
import autoTable from 'jspdf-autotable'

const GeneratePDF = (props) => {
    const {formDetails} = props;

    const printPdf = () => {
        const doc = new jsPDF();
        doc.setTextColor('#117dc2')
        // doc.setCharSpace(0.5)
        doc.text('Body Mass Index Report', 15, 10);
        const date = new Date()
        // doc.setCharSpace(0);
        doc.setFontSize(8.5);
        doc.text(date.toLocaleDateString(), 15, 16);
        doc.setTextColor('#117dc2')
        var str = "This is auto generated report by Joe chatbot. The results are generated based on user input";
        doc.setFontSize(8);// optional
        doc.text(str, 10, doc.internal.pageSize.height - 10);
        doc.text('', 10, doc.internal.pageSize.height - 20);
        doc.setCharSpace(0.4)
        autoTable(doc, {
            headStyles: {
                cellPadding: 0,
                fillColor: [255,255,255]
            },
            startY: 25,
            columnStyles: {
                0: {
                    cellPadding: 2,
                    cellWidth: 70,
                    fontSize: 12,
                    fontStyle: {
                        color: 'grey'
                    }
                },
                1: {
                    cellPadding: 2,
                    cellWidth: 70,
                    fontSize: 12,
                    fontStyle: {
                        color: 'grey'
                    }
                }
            },
            alternateRowStyles: {
                fillColor: [255, 255, 255]
            },
            head: [['', '']],
            body: [
              ['Name : ', `${nameParser(formDetails.name && formDetails.name.value)}`],
              ['Gender : ', `${formDetails.gender && formDetails.gender.value }`],
              ['Age : ', `${formDetails.age && formDetails.age.value } yrs`],
              [`Height (cm): `, `${parseHeightCm(formDetails) + ' cms'}`],
              [`Height (ft): `, `${
                (formDetails.heightFt && formDetails.heightFt.value) ? formDetails.heightFt.value + ' ft'
                    : convertToFeet(formDetails.heightCm && formDetails.heightCm.value) + ' ft'}`],
                ['Weight : ', `${formDetails.weight && formDetails.weight.value + ' kg(s)'}`],
                ['BMI : ', `${calculateBMI(formDetails)}`],
              // ...
            ],
          })
          doc.setCharSpace(0)
          autoTable(doc, {
            headStyles: {
                cellPadding: 1
            },
            startY: 115,
            styles: {
                fontSize: 12
            },
            columnStyles: {
                0: {
                    cellPadding: 3,
                    cellWidth: 70,
                    fontSize: 12,
                    fontStyle: {
                        color: 'gray'
                    }
                },
                1: {
                    cellPadding: 3,
                    cellWidth: 70,
                    fontSize: 12,
                    fontStyle: {
                        color: 'gray'
                    }
                }
            },
            head: [['BMI Score', 'Category']],
            body: [
              ['less than 18.5', 'Under weight'],
              ['18.5 to 24.9 ', 'Healthy Weight'],
              ['25.0 to 29.9', 'over weight'],
              ['30.0 or higher,', 'obese range']
            ],
          })
        doc.save(`${nameParser(formDetails.name && formDetails.name.value)}'s-BMI.pdf`);
    }

    

    return (
        <React.Fragment>
        <Container maxWidth="sm" style={{marginTop: '10px'}}> 
        <Button variant="filled" style={{color: '#117dc2',
        background: 'white',
        padding: '4px',
        fontSize: '10px',
        fontWeight: 600
    }} onClick={() => printPdf()}>
        Download Report
        </Button>
        </Container>
        </React.Fragment>
    )
}

export default GeneratePDF;