export enum ErrorEnum {
  DEFAULT = '0: Unknown error',
  SERVER_ERROR = '500: Service busy, please try again later',

  SYSTEM_USER_EXISTS = '1001: System user already exists',
  INVALID_VERIFICATION_CODE = '1002: Invalid verification code',
  INVALID_EMAIL_PASSWORD = '1003: Invalid email or password',
  NODE_ROUTE_EXISTS = '1004: Node route already exists',
  PERMISSION_REQUIRES_PARENT = '1005: Permission must include parent node',
  ILLEGAL_OPERATION_DIRECTORY_PARENT = '1006: Illegal operation: This node only supports directory type parent node',
  ILLEGAL_OPERATION_CANNOT_CONVERT_NODE_TYPE = '1007: Illegal operation: Node type cannot be directly converted',
  ROLE_HAS_ASSOCIATED_USERS = '1008: The role has associated users, please delete the associated users first',

  PASSWORD_MISMATCH = '1011: Old password does not match original password',
  LOGOUT_OWN_SESSION = '1012: If you want to log out yourself, please click on the logout option in the upper right corner',
  NOT_ALLOWED_TO_LOGOUT_USER = '1013: Not allowed to log out this user',
  PARENT_MENU_NOT_FOUND = '1014: Parent menu not found',
  USER_NOT_FOUND = '1017: User not found',
  DEPARTMENT_NOT_FOUND = '1019: Department not found',

  INVALID_LOGIN = '1101: Invalid login, please log in again',
  NO_PERMISSION = '1102: No permission to access',
  ONLY_ADMIN_CAN_LOGIN = '1103: Only administrators can login',
  REQUEST_INVALIDATED = '1104: The current request has been invalidated',
  ACCOUNT_LOGGED_IN_ELSEWHERE = '1105: Your account is logged in elsewhere',
  GUEST_ACCOUNT_RESTRICTED_OPERATION = '1106: Guest account is not allowed to operate',
  REQUESTED_RESOURCE_NOT_FOUND = '1107: The requested resource does not exist',

  TOO_MANY_REQUESTS = '1201: Too many requests, please try again in one minute',
  MAXIMUM_FIVE_VERIFICATION_CODES_PER_DAY = '1202: Maximum of five verification codes can be sent per day',
  VERIFICATION_CODE_SEND_FAILED = '1203: Verification code sending failed',

  INSECURE_MISSION = '1301: Insecure mission, make sure to include @Mission annotation in execution',
  EXECUTED_MISSION_NOT_FOUND = '1302: Executed mission not found',
  MISSION_EXECUTION_FAILED = '1303: Mission execution failed',
  MISSION_NOT_FOUND = '1304: Mission not found',

  // OSS related
  OSS_FILE_OR_DIR_EXIST = '1401: The file or directory being created already exists',
  OSS_NO_OPERATION_REQUIRED = '1402: No operation required',
  OSS_EXCEE_MAXIMUM_QUANTITY = '1403: Exceeded the maximum quantity supported',

  //CATEGORY
  CATEGORY_ALREADY_EXIST = '1403: category already exists',
  CATEGORY_NOT_EXIST = '1404: category is not exist',

  //BLOG
  BLOG_ALREADY_EXIST = '1405: blog already exists',
  BLOG_NOT_EXIST = '1406: blog is not exist',

  //BLOG
  SEO_ALREADY_EXIST = '1407: Seo configuration already exist for this country!',
  SEO_NOT_EXIST = '1408: Seo is not exist',

  //Comment
  COMMENT_ALREADY_EXIST = '1409: Comment Not Founded',
  COMMENT_NOT_EXIST = '1410: Comment Already Exists',

  //Replay
  REPLAY_ALREADY_EXIST = '1411: Replay Not Founded',
  REPLAY_NOT_EXIST = '1412: Replay Already Exists',

  //Contact us
  CONTACTUS_ALREADY_EXIST = '1413: Contact us message Not Founded',
  CONTACTUS_NOT_EXIST = '1414: contact us message Already Exists',

  //Contact us
  BANNER_ALREADY_EXIST = '1415: banner Not Founded',
  BANNER_NOT_EXIST = '1416: banner Already Exists',
  MIXIMUM_BANNERS = '1417: Can not have more than 6 banners , please remove one before proceeding',
}
