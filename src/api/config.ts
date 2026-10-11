export const Methods = {
  POST: "POST",
  GET: "GET",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
};

export const JsonHeader = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const FormDataHeader = {
  "Content-Type": "multipart/form-data",
};

export class EndPoint {
  // static DEFAULT_URL = "http://localhost:5000/api";
  // static DEFAULT_URL = "http://192.168.10.234:5000/api";
  // static DEFAULT_URL = "https://www.theclinicall.com/api";
  static DEFAULT_URL = process.env.NEXT_PUBLIC_CLINICALL_SERVER_URL || "";

  /* ----------- Doctor Service -------------- */

  static VERIFY_JWT = "auth/user/verify-jwt";

  static DOCTOR_CREATE = "doctor/add/new";
  static DOCTOR_LOGIN = "doctor/login";
  static DOCTOR_FIND_ALL_INFO = "doctor/getall/info";
  static DOCTOR_FIND_ALL_NAME = "doctor/gatall/name";
  static DOCTOR_FIND_BY_ID = "doctor/getById";
  static DOCTOR_UPDATE_BY_ID = "doctor/update";
  static DOCTOR_SPECIALIST = "doctor/specialist";
  static DOCTOR_FIND_BY_CATEGORY = "doctor/getByCategory";
  static DOCTOR_BOOK_APPOINTMENT = "doctor/book/appointment";
  static DOCTOR_RESEND_PRESCRIPTION = "doctor/resend/prescription";
  static USER_APPOINTMENT_HISTORY = "doctor/appointment/getByUserId";
  static DOCTOR_UPCOMING_SCHEDULE = "doctor/appointment/upcoming";
  static DOCTOR_UPCOMING_SCHEDULE_V2 = "doctor/appointment/upcoming-v2";
  static DOCTOR_SCHEDULE_HISTORY = "doctor/appointment/history";
  static DOCTOR_SCHEDULE_HISTORY_V2 = "doctor/appointment/history-v2";

  static DOCTOR_SCHEDULE_UPDATE = "doctor/book/appointment/update";
  static AVAILABLE_DOCTOR = "doctor/get/available";
  static DOCTOR_APPOINTMENT_GET_ALL = "doctor/appointment/getAll";

  /* ----------- Call History ---------------- */
  static CALL_HISTORY_CREATE = "doctor/call-history/create";
  static CALL_HISTORY_UPDATE = "doctor/call-history/update";
  static CALL_HISTORY_GET = "doctor/call-history/get";
  static CALL_UPDATE = "doctor/call-history/update";
  /* ----------- Admin Service ---------------- */

  static CATEGORY_OF_DOCTOR_CREATE = "doctor_category/add/new";
  static CATEGORY_OF_DOCTOR_FIND_ALL_INFO = "doctor_category/getall/info";
  static CATEGORY_OF_DOCTOR_FIND_ALL_NAME = "doctor_category/gatall/name";

  static LOCATION_CREATE = "location/add/new";
  static LOCATION_FIND_ALL_INFO = "location/getall/info";
  static LOCATION_FIND_ALL_NAME = "location/gatall/name";

  static HOSPITAL_CREATE = "hospital/add/new";
  static HOSPITAL_FIND_ALL = "hospital/getall";
  static HOSPITAL_FIND_ALL_NAME = "hospital/gatall/name";

  // Lab test
  static LAB_TEST_CREATE = "labTest/add/new";
  static LAB_TEST_FIND_ALL = "labTest/getall/info";

  static LAB_TEST_CENTER_CREATE = "testCenter/add/new";
  static LAB_TEST_CENTER_FIND_ALL = "testCenter/getall";
  static LAB_PACKAGE = "lab-package/getAll";

  static SEARCH_DOCTOR = "search/doctor";

  static PACKAGE_CREATE = "package/add/new";
  static PACKAGE_FIND_ALL = "package/getall";
  static PACKAGE_FIND_BY_ID = "package/get";
  static BOOK_PACKAGE = "package/book/new";
  static GET_BOOK_PACKAGE_BY_UID = "bookedPackage/getByUid";
  static CARD_DICOUNT_CHECK = "card-discount/check";

  static SERVICE_CREATE = "service/add/new";
  static SERVICE_FIND_ALL = "service/getall";

  static BLOG_CREATE = "blog/add/new";
  static BLOG_FIND_ALL = "blog/getall";
  static BLOG_HOME = "blog/homepage";
  static SINGLE_BLOG_HOME = "blog/get";

  static PARTNAR_CREATE = "partnar/add/new";
  static PARTNAR_FIND_ALL = "partner/getall";

  static SIGNUP = "auth/user/signup";
  static SIGNIN = "auth/user/signin";
  static SINGLE_USER = "auth/user/getById";
  static SINGLE_USER_UPDATE = "auth/user/update";
  static SIGNIN_SOCIAL_AUTH = "auth/user/social/signin";
  static DELETE_ACCOUNT = "auth/user/delete";

  static MEDICINE_GETALL = "medicine/getall";
  static MEDICINE_GET_SINGLE_VALUE = "medicine/getById";
  static MEDICINE_GET_SINGLE_SLUG = "medicine/getBySlug";

  static PRODUCT_GETALL = "healthmart/product/getall";
  static PRODUCT_GET_SINGLE_VALUE = "healthmart/product/getById";
  static PRODUCT_BEST_SELL = "healthmart/product/best-sell";
  static PRODUCT_OFFER_WEEKLY = "healthmart/product/offer-weekly";
  static PRODUCT_NEW_ARRIVAL = "healthmart/product/new-arrival";

  static ROLE_CREATE = "admin/role/add/new";
  static ROLE_FIND_ALL = "admin/role/getall";

  static ADD_USER = "admin/user/add";
  static USER_GETALL = "admin/user/getall";

  static CREATE_PACKAGE = "package/add/new";
  static B2B_UPLOAD_USER = "admin/b2b/upload";
  static LAB_TEST_UPLOAD = "labTest/upload/csv";
  static ALL_LAB_TEST_NAME = "labTest/getall/name";
  static SEARCH_LAB_TEST = "labTest/search/test";
  static GET_BOOK_PACKAGE = "bookedPackage/getByUid";
  static GET_ALL_ORDER = "order/getByUserId";
  static ADMIN_FILE_UPLOAD = "admin/file/upload";
  static ADMIN_CLAIM_SUBMITION = "admin/claim/create";
  static SINGLE_CLAIM_GET_BY_ID = "admin/claim/getById";
  static GET_ALL_CLAIM = "admin/claim/getall";
  static CLAIM_UPDATE = "admin/claim/update";

  static ADDNEWORDER = "order/add/new";
  static ORDERHISTORY = "order/getByUserId";
  static LABORDERHISTORY = "labTest/getByUser";
  static SINGLEORDER = "order/invoice";
  static ADDPRESCRIPTION = "prescription-order/add/new";

  // Auth
  static OTPCREATE = "admin/otp/create";
  static OTPCHECK = "admin/otp/check";
  //user  Forget Password
  static USERRECOVERPASSWORD = "auth/user/recover-password";
  static USERFORGETPASSWORD = "auth/user/forgot-password";
  static FORGETOTPCHECK = "auth/user/forgot-otp-check";
  static RECOVERYPASSWORD = "auth/user/recover-password";
  //Doctor Forget password
  static DOCTORFORGETPASSWORD = "doctor/forgot-password";
  static DOCTORFORGETOTPCHECK = "doctor/forgot-otp-check";
  static DOCTORRECOVERYPASSWORD = "doctor/recover-password";

  static LABORDER = "labTest/book/new";

  static PARENTSCATEGORY = "medicine/getall/parent-category";
  static paymentcallback = "admin/ebl/payment/callback";

  //Buy Invoice Number
  static GETLABTESTBYINVOICENUMBER = "labTest/getBy";
  static GETORDERBYINVOICENUMBER = "order/invoice";
  static GETDOCTORAPPBYINVOICENUMBER = "doctor/appointment/getBy";
  static GETPACKAGEBYINVOICENUMBER = "package/getBy";

  static GLOBALSEARCH = "admin/global-search?keyWord=";
  static addressById = "admin/getall/addressByUId";
  static BKASHPAYMENTCREATE = "admin/bkash/payment/create";
  static BKPAYMENTEXECUTE = "admin/bkash/payment/execute";
  static EBLPAYMENTCALLBACK = "admin/ebl/payment/callback";
  static GETALLADDRESSBYUSERID = "admin/getall/addressByUId";
  static PACKAGECHECKBYNUMBER = "package/checkByPhone";
  static PACKAGEGIFTBYNUMBER = "package/gift";
  static PACKAGEBOOKUPDATEID = "package/book/update";

  static USEROTPSIGNIN = "auth/user/otp/signin";

  static USEROTPCHECK = "auth/user/otp/signin/check";

  static DOCTOR_APPOINTMENT_GET_BY_USER_ID = "doctor/appointment/getByUserId";
  static PRESCRIPTION_GET_BY_ID = "prescription/by";

  static REPORTUPLOAD = "admin/add-user-report";
  static GETREPORTBYID = "admin/get-user-report";
  static PROMO_CODE_CHECK = "promo-code/check";
  static LAB_SINGLE_PACKAGE = "lab-package/get";
  static LAB_SINGLE_PACKAGE_ORDER = "lab-package/purchase";
  static LAB_PACKAGE_GETBY_INVOICE = "lab-package/purchase";
  static LAB_PACKAGE_GET_BY_USER_ID = "lab-package/purchase-list";

  static CARE_GIVER_CATEGORY_GET_ALL = "caregiver/category/getall";
  static PHYSICAL_DOCTOR_FIND_ALL = "physical-doctor/find-all";
  static PHYSICAL_DOCTOR_BOOK = "physical-doctor/book";
  static PHYSICAL_DOCTOR_GET_BY_INVOICE = "physical-doctor/book/getBy";
  static PHYSICAL_DOCTOR_GET_BY_ID = "physical-doctor/book";
  static G_DELTA_I_CALL_POST = "admin/g-delta-i-call/create";
  static G_DELTA_I_CALL_GET = "admin/g-delta-i-call/get";
  static GEARS_I_CALL_POST = "admin/gears-i-call/create";
  static GEARS_I_CALL_GET = "admin/gears-i-call/get";

  static SETTING_FIND_ALL = "settings/find-all";
  static GP_LOYALITY_CHECK = "gp-loyality/check";
  static BAT_EMPLOY_CREATE = "bat-employee/create";
  static BAT_GET_BY_EMP_ID = "admin/user/getByEmpId";
  static BAT_USER_UPDATE = "admin/bat-employee/update";
  static CAREGIVER_BOOK_NEW = "caregiver/book/new";
  static CARE_GIVER_GET_ALL = "caregiver/getall";
  static CARE_GIVER_BOOK_NEW = "caregiver/book/new";
  static CARE_GIVER_GET_BY_INVOICE_ID="caregiver/book/getBy"
}
