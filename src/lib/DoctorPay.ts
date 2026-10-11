import { Appointment } from "./LibInterface";
function uniqid() {
  return (
    Math.random().toString(36).substr(2, 9) + Date.now().toString(36).substr(-4)
  );
}
const DoctorPay = async (order: Appointment) => {
  // const referenceNumber = `PWHC${new Date()
  //   .toISOString()
  //   .replace(/[-:T.Z]/g, "")
  //   .slice(0, 14)}${Math.floor(Math.random() * 9000) + 1000}${
  //   Math.floor(Math.random() * 900) + 100
  // }`;

  const nameParts = order.fullName.split(" ")
  // console.log(nameParts);

  // console.log(order);
  // return;
  const uniqueId = uniqid();

  const signedDateTime = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
  const override_backoffice_post_url = `${process.env.NEXT_PUBLIC_CLINICALL_SERVER_URL}/admin/ebl/payment/callback`;
  const override_custom_cancel_page = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/cancel`;
  const override_custom_receipt_page = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/ebl-receipt`;

  const signData = {
    access_key: process.env.NEXT_PUBLIC_EBL_ACCESS_KEY,
    profile_id: process.env.NEXT_PUBLIC_EBL_PROFILE_ID,
    transaction_uuid: uniqueId,
    consumer_id: "MONSUR_HOQ",
    signed_field_names:
      "access_key,profile_id,transaction_uuid,consumer_id,signed_field_names,unsigned_field_names,signed_date_time,locale,transaction_type,reference_number,auth_trans_ref_no,amount,currency,bill_to_forename,bill_to_surname,bill_to_email,bill_to_phone,bill_to_address_line1,bill_to_address_city,bill_to_address_country,bill_to_postal_code,override_backoffice_post_url,override_custom_cancel_page,override_custom_receipt_page",
    unsigned_field_names: "",
    signed_date_time: signedDateTime,
    locale: "en",
    transaction_type: "sale",
    reference_number: order.invoiceNumber,
    auth_trans_ref_no: order.invoiceNumber,
    amount: order.paymentFee.toString(),
    currency: "BDT",
    bill_to_forename: nameParts[0],
    bill_to_surname: nameParts[1],
    bill_to_email: order.email,
    bill_to_phone: order.phone,
    bill_to_address_line1: "Baridhara",
    bill_to_address_city: "Dhaka",
    bill_to_address_country: "BD",
    bill_to_postal_code: "1000",
    override_backoffice_post_url: override_backoffice_post_url,
    override_custom_cancel_page: override_custom_cancel_page,
    override_custom_receipt_page: override_custom_receipt_page,
  };
  // console.log(signData);
  
// return
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_CLINICALL_SERVER_URL}/admin/ebl/payment`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signData),
    }
  );
  // console.log(response);
  
  // return 

  const { data } = await response.json();
  const signature = data.signature;

  const paymentData = {
    access_key: process.env.NEXT_PUBLIC_EBL_ACCESS_KEY, // "be0f3d8d89e83d2389d941c1b3302e0c",
    profile_id: process.env.NEXT_PUBLIC_EBL_PROFILE_ID, //"09894754-E691-4576-99C9-132B96768E7B",
    reference_number: order.invoiceNumber,
    auth_trans_ref_no: order.invoiceNumber,
    transaction_uuid: uniqueId,
    consumer_id: "MONSUR_HOQ",
    signed_field_names:
      "access_key,profile_id,transaction_uuid,consumer_id,signed_field_names,unsigned_field_names,signed_date_time,locale,transaction_type,reference_number,auth_trans_ref_no,amount,currency,bill_to_forename,bill_to_surname,bill_to_email,bill_to_phone,bill_to_address_line1,bill_to_address_city,bill_to_address_country,bill_to_postal_code,override_backoffice_post_url,override_custom_cancel_page,override_custom_receipt_page",
    transaction_type: "sale",
    currency: "BDT",
    unsigned_field_names: "",
    signed_date_time: signedDateTime,
    locale: "en",
    amount: order.paymentFee.toString(),
    bill_to_forename: nameParts[0],
    bill_to_surname: nameParts[1],
    bill_to_email: order.email,
    bill_to_phone: order.phone,
    bill_to_address_line1: "Baridhara",
    bill_to_address_city: "Dhaka",
    bill_to_address_country: "BD",
    bill_to_postal_code: "1000",
  };
  // return

  const form = document.createElement("form");
  form.method = "POST";
  form.action = process.env.NEXT_PUBLIC_EBL_URL || ""; //"https://testsecureacceptance.cybersource.com/pay";
  Object.entries({
    ...paymentData,
    signature,
    override_backoffice_post_url,
    override_custom_cancel_page,
    override_custom_receipt_page,
  }).forEach(([key, value]) => {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = key;
    input.value = value;
    form.appendChild(input);
  });
  document.body.appendChild(form);
  // console.log(form);
  form.submit();
};

// const Payment = async (order: order) => {
//   console.log(order);
// };
export { DoctorPay };
