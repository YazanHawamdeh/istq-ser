import moment from 'moment';

export const validateٌRequestCreate = (data) => {
  let ipformat =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

  // ipformat.test(myForm.emailAddr.value)
  let error = {};

  // if (data.type) {
  //   if (data.type == '1') {
  //     error = {
  //       customerName: data.customerName ? '' : 'Customer name is required',
  //       estimationDate: data.estimationDate ? '' : 'Estimation Date is required',
  //       orderDate: data.orderDate ? '' : 'Request Date is required',
  //     };
  //   } else {
      error = {
        // customerName: data.customerName ? '' : 'Customer name is required',
        // estimationDate: data.estimationDate ? '' : 'Estimation Date is required',
        // orderDate: data.orderDate ? '' : 'Request Date is required',
        // dataCenterName: data.dataCenterName ? '' : 'Data center name is required',
        serverIp: data.serverIp ? (!ipformat.test(data.serverIp) ? 'Server IP is not valid' : '') : 'Server IP is required',
      };
  //   }
    if (data.iloIp) error.iloIp = !ipformat.test(data.iloIp) ? 'Ilo IP is not valid' : '';
  
  //}else {
  //   error.type = 'Type is required';
  // }

  let valid = true;
  Object.keys(error).map((item) => {
    if (error[item].length) valid = false;
  });
  return { error, valid };
};

export const formatDataToSend = (data) => {
  // if (data.type == '1') {
    return {
      // type: data.type,
      customerName: data.customerName,
      // estimationDate: data.estimationDate,
      // orderDate: data.orderDate,
      // required: data.required,
      comment: data.comment,
      iloIp: data.iloIp,
      // workDate: data.workDate,
      iloSwitch: data.iloSwitch,
      iloSwitchPort: data.iloSwitchPort?.map((item) => item.value),
      netWrokSwitch: data.netWrokSwitch?.map((item) => item._id),
      networkSwitchPort: data.networkSwitchPort?.map((item) => item.value),
      dataCenterName: data.dataCenterName,
      serverIp: data.serverIp,
      ram: data.ram,
      serverTag: data.serverTag,
      rack: data.rack || null
    };
//   } else {
//     return {
//       type: data.type,
//       customerName: data.customerName,
//       estimationDate: data.estimationDate,
//       orderDate: data.orderDate,
//       dataCenterName: data.dataCenterName,
//       serverIp: data.serverIp,
//       rack: data.rack || null,
//       serverTag: data.serverTag,
//       required: data.required,
//       comment: data.comment,
//       iloIp: data.iloIp,
//       workDate: data.workDate,
//       iloSwitch: data.iloSwitch,
//       units: data.units?.map((item) => item.value) || null,
//       iloSwitchPort: data.iloSwitchPort?.map((item) => item.value) || null,
//       netWrokSwitch: data.netWrokSwitch?.map((item) => item._id) || null,
//       networkSwitchPort: data.networkSwitchPort?.map((item) => item.value) || null,
//       ram: data.ram,
//     };
//   }
};
