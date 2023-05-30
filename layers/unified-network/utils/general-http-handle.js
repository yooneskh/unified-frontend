

export function generalHttpHandle(status, data, silent) {
  if (status !== 200) {

    if (!silent) {
      alert(data?.message || 'Please try again.');
    }

    return true;

  }
}