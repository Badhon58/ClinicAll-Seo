import { EndPoint, JsonHeader, Methods } from "@/api/config";
import { apiCall } from "@/lib/axios-client";
import { redirect } from "next/navigation";

export const POST = async (req: Request) => {
  const formData = await req.formData();
  const object: any = {};
  formData.forEach(function (value, key) {
    object[key] = value;
  });

  const decision = object.decision;
  const auth_time = object.auth_time;
  const req_reference_number = object.req_reference_number;
  const auth_amount = object.auth_amount;
  // const firstName = object.req_bill_to_forename.replace(/\s+/g, "");
  // const lastName = object.req_bill_to_surname.replace(/\s+/g, "");
  const firstName = encodeURIComponent(object.req_bill_to_forename);
  const lastName = encodeURIComponent(object.req_bill_to_surname);
  const req_bill_to_address_line1 = encodeURIComponent(
    object.req_bill_to_address_line1
  );
  const req_bill_to_address_city = encodeURIComponent(
    object.req_bill_to_address_city
  );
  const country = encodeURIComponent(object.req_bill_to_address_country);
  const phone_no = object.req_bill_to_phone;
  const email = object.req_bill_to_email;
  const card_type = object.card_type_name;
  const card_number = object.req_card_number;
  const auth_code = object.auth_code;
  const auth_trans_ref_no = object.auth_trans_ref_no;
  const auth_reconciliation_reference_number =
    object.auth_reconciliation_reference_number;
  if (decision === "ACCEPT") {
    // const Gift=object.req_reference_number
    const [gift, phone] = req_reference_number.split(",") ?? "None";
    const value = {
      payer_authentication_transaction_id:
        object.payer_authentication_transaction_id,
      auth_trans_ref_no: auth_trans_ref_no,
      req_payment_method: object.req_payment_method,
      req_payer_authentication_merchant_name:
        object.req_payer_authentication_merchant_name,
      req_amount: object.req_amount,
      isGift: gift === "gift" ? true : false,
         auth_code: auth_code,
    };
    const response = await apiCall(
      Methods.POST,
      EndPoint.paymentcallback,
      value,
      JsonHeader
    );
    console.log(response);
    
    if (response.success == true) {
      // redirect(
      //   `https://localhost:3000/receipt?auth_time=${auth_time}&req_reference_number=${req_reference_number}&auth_amount=${auth_amount}&firstName=${firstName}&lastName=${lastName}&address_line1=${req_bill_to_address_line1}&address_city=${req_bill_to_address_city}&country=${country}&phone_no=${phone_no}&email=${email}&card_type=${card_type}&card_number=${card_number}&auth_code=${auth_code}&auth_reconciliation_reference_number=${auth_reconciliation_reference_number}`
      // );
      redirect(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}/microsite/microreceipt?auth_trans_ref_no=${auth_trans_ref_no}&auth_time=${auth_time}&req_reference_number=${req_reference_number}&auth_amount=${auth_amount}&firstName=${firstName}&lastName=${lastName}&address_line1=${req_bill_to_address_line1}&address_city=${req_bill_to_address_city}&country=${country}&phone_no=${phone_no}&email=${email}&card_type=${card_type}&card_number=${card_number}&auth_code=${auth_code}&auth_reconciliation_reference_number=${auth_reconciliation_reference_number}`
      );
    } else {
      redirect(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/microsite/micro-payment-failed`);
    }
  } else {
    redirect(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/microsite/micro-payment-failed`);
  }
};
