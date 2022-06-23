import { LookupsEnums } from '../../utils/constants';
import { CREATE_NEW_LOOKUP, DELETE_LOOKUP, GET_ALL_LOOKUPS, UPDATE_LOOKUP, UPDATE_LOOKUP_SETTINGS } from './actionsTypes';

const initialState = {
  ILO_SWITCH: [],
  NETWORK_SWITCH: [],
  RACK: [],
  CHASIS: [],
  RAM: [],
  CPU: [],
  DISKS: [],
  NETWORK_INTERFACE: [],
  UNITS: [],
  ILO_SWITCH_PORT: [],
  NETWORK_SWITCH_PORT: [],
  SETTIGNS: {},
};

let newState = [];

const LOOKUPS_STORE = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_LOOKUPS:
      return { ...state, ...payload, UNITS: payload.OTHERS, ILO_SWITCH_PORT: payload.OTHERS, NETWORK_SWITCH_PORT: payload.OTHERS };

    case CREATE_NEW_LOOKUP:
      newState = {
        ...state,
        ILO_SWITCH: payload.type == LookupsEnums.ILO_SWITCH ? [...state.ILO_SWITCH, payload] : state.ILO_SWITCH,
        NETWORK_SWITCH: payload.type == LookupsEnums.NETWORK_SWITCH ? [...state.NETWORK_SWITCH, payload] : state.NETWORK_SWITCH,
        RACK: payload.type == LookupsEnums.RACK ? [...state.RACK, payload] : state.RACK,
        CHASIS: payload.type == LookupsEnums.CHASIS ? [...state.CHASIS, payload] : state.CHASIS,
        RAM: payload.type == LookupsEnums.RAM ? [...state.RAM, payload] : state.RAM,
        CPU: payload.type == LookupsEnums.CPU ? [...state.CPU, payload] : state.CPU,
        DISKS: payload.type == LookupsEnums.DISKS ? [...state.DISKS, payload] : state.DISKS,
        NETWORK_INTERFACE: payload.type == LookupsEnums.NETWORK_INTERFACE ? [...state.NETWORK_INTERFACE, payload] : state.NETWORK_INTERFACE,
      };
      return { ...state, ...newState };

    case DELETE_LOOKUP:
      newState = {
        ...state,
        ILO_SWITCH: payload.type == LookupsEnums.ILO_SWITCH ? [...state.ILO_SWITCH.filter((item) => item._id !== payload._id)] : state.ILO_SWITCH,
        NETWORK_SWITCH:
          payload.type == LookupsEnums.NETWORK_SWITCH ? [...state.NETWORK_SWITCH.filter((item) => item._id !== payload._id)] : state.NETWORK_SWITCH,
        RACK: payload.type == LookupsEnums.RACK ? [...state.RACK.filter((item) => item._id !== payload._id)] : state.RACK,
        CHASIS: payload.type == LookupsEnums.CHASIS ? [...state.CHASIS.filter((item) => item._id !== payload._id)] : state.CHASIS,
        RAM: payload.type == LookupsEnums.RAM ? [...state.RAM.filter((item) => item._id !== payload._id)] : state.RAM,
        CPU: payload.type == LookupsEnums.CPU ? [...state.CPU.filter((item) => item._id !== payload._id)] : state.CPU,
        DISKS: payload.type == LookupsEnums.DISKS ? [...state.DISKS.filter((item) => item._id !== payload._id)] : state.DISKS,
        NETWORK_INTERFACE:
          payload.type == LookupsEnums.NETWORK_INTERFACE
            ? [...state.NETWORK_INTERFACE.filter((item) => item._id !== payload._id)]
            : state.NETWORK_INTERFACE,
      };
      return { ...state, ...newState };

    case UPDATE_LOOKUP:
      newState = {
        ...state,
        ILO_SWITCH:
          payload.type == LookupsEnums.ILO_SWITCH
            ? [...state.ILO_SWITCH.map((item) => (item._id !== payload._id ? item : { ...item, label: payload.label }))]
            : state.ILO_SWITCH,
        NETWORK_SWITCH:
          payload.type == LookupsEnums.NETWORK_SWITCH
            ? [...state.NETWORK_SWITCH.map((item) => (item._id !== payload._id ? item : { ...item, label: payload.label }))]
            : state.NETWORK_SWITCH,
        RACK:
          payload.type == LookupsEnums.RACK
            ? [...state.RACK.map((item) => (item._id !== payload._id ? item : { ...item, label: payload.label }))]
            : state.RACK,
        CHASIS:
          payload.type == LookupsEnums.CHASIS
            ? [...state.CHASIS.map((item) => (item._id !== payload._id ? item : { ...item, label: payload.label }))]
            : state.CHASIS,
        RAM:
          payload.type == LookupsEnums.RAM
            ? [...state.RAM.map((item) => (item._id !== payload._id ? item : { ...item, label: payload.label }))]
            : state.RAM,
        CPU:
          payload.type == LookupsEnums.CPU
            ? [...state.CPU.map((item) => (item._id !== payload._id ? item : { ...item, label: payload.label }))]
            : state.CPU,
        DISKS:
          payload.type == LookupsEnums.DISKS
            ? [...state.DISKS.map((item) => (item._id !== payload._id ? item : { ...item, label: payload.label }))]
            : state.DISKS,
        NETWORK_INTERFACE:
          payload.type == LookupsEnums.NETWORK_INTERFACE
            ? [...state.NETWORK_INTERFACE.map((item) => (item._id !== payload._id ? item : { ...item, label: payload.label }))]
            : state.NETWORK_INTERFACE,
      };
      return { ...state, ...newState };

    case UPDATE_LOOKUP_SETTINGS:
      return { ...state, SETTIGNS: { ...state.SETTIGNS, ...payload } };

    default:
      return state;
  }
};

export default LOOKUPS_STORE;
