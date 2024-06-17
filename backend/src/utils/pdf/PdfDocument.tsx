import React from "react";
import ReactPDF, {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import Order from "../../models/order";

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
  qrCodes: QRCode[];
};

interface PDFProps {
  orderData: OrderData;
  // qrCodes: {
  //   eventId: string;
  //   ticketId: string;
  //   qrCodeBase64: string;
  // }[];
}

export type QRCode = {
  eventId: string;
  ticketId: string;
  qrCodeBase64: string;
};

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
  ticketImage: {
    marginTop: 20,
    width: 300,
    height: 200,
    alignSelf: "center",
  },
});

const PDF = ({ orderData }: PDFProps) => {
  console.log(orderData);
  return (
    <Document>
      {/* {map here} */}
      {/* Start of the page */}
      {orderData.events.map((event, eventIndex) =>
        event.tickets.map((ticket) =>
          // Creating a new page for each ticket ( based on quantity)
          [...Array(ticket.quantity)].map((_, index) => (
            <Page
              size="A4"
              style={styles.page}
              key={`${event.eventId._id}-${ticket.ticketId._id}-${index}`}
            >
              <View style={styles.header}>
                <Text>
                  {event.eventId.title} •{" "}
                  {new Date(orderData.createdAt).toLocaleDateString()}
                </Text>
                <Text style={styles.ticketNo}>{orderData._id}</Text>
              </View>

              <View style={styles.infoSection}>
                <View style={styles.leftColumn}>
                  <Text style={styles.label}>TIME & LOCATION</Text>
                  <Text style={styles.text}>
                    {new Date(event.eventId.startTime).toLocaleString()} -{" "}
                    {new Date(event.eventId.endTime).toLocaleString()}{" "}
                  </Text>
                  <Text style={styles.text}>{event.eventId.location}</Text>

                  <Text style={styles.label}>TICKET TYPE & PRICE</Text>
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
                  <Text>
                    {new Date(orderData.createdAt).toLocaleDateString()}
                  </Text>
                </View>
                <View style={styles.ticketHolder}>
                  <Text style={styles.label}>
                    {ticket.ticketId.type} - ${ticket.ticketId.price}
                  </Text>

                  <Image
                    style={styles.qrCode}
                    src={
                      orderData.qrCodes.find(
                        (qrCode) =>
                          qrCode.eventId === event.eventId._id &&
                          qrCode.ticketId === ticket.ticketId._id
                      )?.qrCodeBase64 || ""
                    }
                  />
                </View>
              </View>
              <View style={styles.footer}>
                <Text>
                  This is your event ticket. Ticket holders must present their
                  tickets and Valid Government ID on entry. You can either print
                  your ticket or present this digital version. You can find all
                  the details about this event on our website.
                </Text>
                <Text style={{ marginTop: 10 }}>
                  Valid for one (1) person [19+ ONLY]; General Admission to the
                  event
                </Text>
                <Text style={{ marginTop: 10 }}>
                  Event is Rain or Shine! All purchases are final sale - NO
                  REFUNDS.
                </Text>
              </View>
            </Page>
          ))
        )
      )}
    </Document>
  );
};
export default async (data: PDFProps, filePath: string) => {
  return await ReactPDF.renderToFile(
    <PDF orderData={data.orderData} />,
    filePath
  );
};
