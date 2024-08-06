

export function authenticationMatchPermission(permit, permission) {

  const permitParts = permit.split('.');
  const permissionParts = permission.split('.');
  const minLength = Math.min(permitParts.length, permissionParts.length);

  for (let index = 0; index < minLength; index++) {

    const curPermission = permissionParts[index];
    const curPermit = permitParts[index];

    if (curPermit.includes('**')) {
      return curPermission.startsWith( curPermit.slice(0, curPermit.indexOf('**')) );
    }
    else if (curPermit.includes('*')) {

      const testReg = new RegExp(`^${curPermit.replaceAll('*', '.+')}$`);

      if (!testReg.test(curPermission)) {
        return false;
      }

    }
    else if (curPermit !== curPermission) {
      return false;
    }

  }

  return permitParts.length === permissionParts.length;

}

export function authenticationUserHasPermission(permission) {
  return useUser().value?.permissions.some(it =>
    matchPermission(it, permission)
  );
}