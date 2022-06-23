export const dceUpdateStatusValidation = (data) => {
  let ipformat =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

  let error = {
    iloIp: ipformat.test(data?.iloIp) ? '' : 'Ilo Ip is required',
    iloSwitch: data.iloSwitch ? '' : 'ilo Switch required',
    iloSwitchPort: data.iloSwitchPort ? '' : 'ilo Switch Port is required',
    netWrokSwitch: data.netWrokSwitch ? '' : 'netWrok Switch is required',
    networkSwitchPort: data.networkSwitchPort ? '' : 'network Switch Port is required',
    rack: data.rack ? '' : 'Rack is required',
    serverTag: data.serverTag ? '' : 'Server Tag is required',
    units: data.units ? '' : 'Units is required',
    workDate: data.workDate ? '' : 'WorkDate is required',
  };

  let valid = true;
  Object.keys(error).map((item) => {
    if (error[item].length) valid = false;
  });
  return { error, valid };
};
