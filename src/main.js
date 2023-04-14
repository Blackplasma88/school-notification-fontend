import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import moment from "moment/moment";
import "bootstrap/dist/css/bootstrap.css";

import "sweetalert2/dist/sweetalert2.min.css";
import VueSweetalert2 from "vue-sweetalert2";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faTableList } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faAward } from "@fortawesome/free-solid-svg-icons";
import { faSchoolFlag } from "@fortawesome/free-solid-svg-icons";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import { registerLicense } from "@syncfusion/ej2-base";

registerLicense(
  "ORg4AjUWIQA/Gnt2VVhhQlFac1pJWnxAYVF2R2FJeVRycl9FYEwgOX1dQl9hSXhTf0RjWX5dcHddTmg="
);
import { SchedulePlugin } from "@syncfusion/ej2-vue-schedule";

library.add(faBars);
library.add(faChevronLeft);
library.add(faEnvelope);
library.add(faComment);
library.add(faComments);
library.add(faUsers);
library.add(faLocationDot);
library.add(faBook);
library.add(faList);
library.add(faCheck);
library.add(faRightFromBracket);
library.add(faTableList);
library.add(faSearch);
library.add(faBell);
library.add(faAward);
library.add(faSchoolFlag);
library.add(faChartLine);

createApp(App)
  .use(VueSweetalert2)
  .use(router)
  .use(moment)
  .use(SchedulePlugin)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
