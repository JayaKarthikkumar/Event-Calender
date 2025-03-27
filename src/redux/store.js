import { Provider } from "react-redux";
import store from "../redux/store";

function CalendarComponent() {
  return (
    <Provider store={store}>
      <div>Calendar Component</div>
    </Provider>
  );
}
