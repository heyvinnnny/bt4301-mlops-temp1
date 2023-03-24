import FormGroupInput from "./Inputs/formGroupInput.vue";

import DropDown from "./Dropdown.vue";
import PaperTable from "./PaperTable.vue";
import Button from "./Button";

import Card from "./Cards/Card.vue";
import LoginCard from "./Cards/LoginCard.vue";
import RegisterCard from "./Cards/RegisterCard.vue";
import ForgetPasswordCard from "./Cards/ForgetPasswordCard.vue";
import ResetPasswordCard from "./Cards/ResetPasswordCard.vue";
import ManagerApproval from "./Cards/ManagerApproval.vue";
import ActivityLogCard from "./Cards/ActivityLogCard.vue";
import ChartCard from "./Cards/ChartCard.vue";
import StatsCard from "./Cards/StatsCard.vue";

import SidebarPlugin from "./SidebarPlugin/index";

let components = {
  FormGroupInput,
  Card,
  LoginCard,
  RegisterCard,
  ForgetPasswordCard,
  ResetPasswordCard,
  ManagerApproval,
  ActivityLogCard,
  ChartCard,
  StatsCard,
  PaperTable,
  DropDown,
  SidebarPlugin,
};

export default components;

export {
  FormGroupInput,
  Card,
  LoginCard,
  RegisterCard,
  ForgetPasswordCard,
  ResetPasswordCard,
  ManagerApproval,
  ActivityLogCard,
  ChartCard,
  StatsCard,
  PaperTable,
  DropDown,
  Button,
  SidebarPlugin,
};
