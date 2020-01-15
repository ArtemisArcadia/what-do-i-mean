import axios from "axios";

export default axios.create({
	baseURL: "https://www.behindthename.com/api/lookup.json?"
});
