export const STATUS = {
  bad_request: 400,
  non_authorization: 401,
  created: 201,
  non_content: 204,
  ok: 200,
  fall_server: 500,
};

export const USER_CODE = {
  ok: 200,
  error_server: 500,
};

export const LAYER = {
  global: 'global',
  action: 'action',
  service: 'service',
  repository: 'repository',
};

export const STRENGTH_BCRYCT = 12;

export const ROLES = {
  user: 'user',
  admin: 'admin',
};

const sharedPermissions = ['auth:getuserbyid', 'auth:getusers'];

export const PERMISSIONS = {
  admin: [...sharedPermissions, 'auth:deleteuserbyid'],
  user: [...sharedPermissions],
};
