import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import moment from "moment/moment";
import "bootstrap/dist/css/bootstrap.css";

import "sweetalert2/dist/sweetalert2.min.css";
import VueSweetalert2 from "vue-sweetalert2";



import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
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
import { faSchoolFlag } from "@fortawesome/free-solid-svg-icons";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { faChalkboardUser } from "@fortawesome/free-solid-svg-icons";

library.add(faComments);
library.add(faLocationDot);
library.add(faBook);
library.add(faUser);
library.add(faUsers);
library.add(faMessage);
library.add(faRightFromBracket);
library.add(faList);
library.add(faVideo);
library.add(faSchoolFlag);
library.add(faTableList);
library.add(faCheck);
library.add(faChartLine);
library.add(faChalkboardUser);

library.add(faComment);








library.add(faSearch);
library.add(faBell);

library.add(faGraduationCap);

createApp(App)
  .use(VueSweetalert2)
  .use(router)
  .use(moment)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
