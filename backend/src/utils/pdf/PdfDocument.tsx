import React from "react";
import ReactPDF, {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

// Define TypeScript types
export type OrderData = {
  _id: string;
  userId: string;
  events: {
    eventId: {
      _id: string;
      title: string;
      imageUrls: string[];
      startTime: string;
      endTime: string;
      location: string;
    };
    tickets: {
      ticketId: {
        _id: string;
        type: string;
        price: number;
      };
      quantity: number;
    }[];
  }[];
  totalPrice: number;
  paymentStatus: string;
  firstName: string;
  lastName: string;
  email: string;
  paymentMethodId: string;
  paymentIntentId: string;
  createdAt: Date;
  updatedAt: Date;
};

interface PDFProps {
  orderData: OrderData;
  qrCodeBase64: string;
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    padding: 20,
  },
  header: {
    backgroundColor: "black",
    color: "white",
    padding: 10,
    fontSize: 16,
    fontWeight: "bold",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ticketNo: {
    fontSize: 12,
  },
  infoSection: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
  },
  leftColumn: {
    width: "70%",
  },
  rightColumn: {
    width: "30%",
    paddingLeft: 10,
  },
  label: {
    fontWeight: "bold",
    fontSize: 12,
    marginBottom: 5,
  },
  text: {
    fontSize: 12,
    marginBottom: 10,
  },
  ticket: {
    marginTop: 10,
    borderTop: 1,
    borderBottom: 1,
    paddingVertical: 10,
  },
  ticketHolder: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footer: {
    marginTop: 20,
    fontSize: 12,
  },
  image: {
    marginTop: 10,
    width: 150,
    height: 100,
  },
  qrCode: {
    marginTop: 10,
    width: 100,
    height: 100,
  },
});

const PDF = ({ orderData, qrCodeBase64 }: PDFProps) => {
  console.log(orderData);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text>
            {orderData.events[0].eventId.title} •{" "}
            {new Date(orderData.createdAt).toLocaleDateString()}
          </Text>
          <Text style={styles.ticketNo}>{orderData._id}</Text>
        </View>

        <View style={styles.infoSection}>
          <View style={styles.leftColumn}>
            <Text style={styles.label}>TIME & LOCATION</Text>
            <Text style={styles.text}>
              {new Date(orderData.events[0].eventId.startTime).toLocaleString()}{" "}
              - {new Date(orderData.events[0].eventId.endTime).toLocaleString()}{" "}
            </Text>
            <Text style={styles.text}>
              {orderData.events[0].eventId.location}
            </Text>

            <Text style={styles.label}>TICKET TYPE & PRICE</Text>
            <Text style={styles.text}>
              {orderData.events[0].tickets[0].ticketId.type} - $
              {orderData.events[0].tickets[0].ticketId.price}
            </Text>
          </View>
          <View style={styles.rightColumn}>
            <Text style={styles.label}>ORDER NO.</Text>
            <Text style={styles.text}>{orderData._id}</Text>

            <Text style={styles.label}>PAYMENT STATUS</Text>
            <Text style={styles.text}>{orderData.paymentStatus}</Text>

            <Image src={qrCodeBase64} style={styles.qrCode} />
          </View>
        </View>

        <View style={styles.ticket}>
          <View style={styles.ticketHolder}>
            <Text style={styles.label}>TICKET HOLDER</Text>
            <Text style={styles.label}>ORDER DATE</Text>
          </View>
          <View style={styles.ticketHolder}>
            <Text>
              {orderData.firstName} {orderData.lastName}
            </Text>
            <Text>{new Date(orderData.createdAt).toLocaleDateString()}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text>
            This is your event ticket. Ticket holders must present their tickets
            and Valid Government ID on entry. You can either print your ticket
            or present this digital version. You can find all the details about
            this event on our website.
          </Text>
          <Text style={{ marginTop: 10 }}>
            Valid for one (1) person [19+ ONLY]; General Admission to the event
          </Text>
          <Text style={{ marginTop: 10 }}>
            Event is Rain or Shine! All purchases are final sale - NO REFUNDS.
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default async (data: PDFProps, filePath: string) => {
  return await ReactPDF.renderToFile(
    <PDF orderData={data.orderData} qrCodeBase64={data.qrCodeBase64} />,
    filePath
  );
};
