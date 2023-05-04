import { requireAuth } from "../utils/requireAuth";

function Test() {
	return (
		<section>
			<h1>Test</h1>
		</section>
	);
}

export async function testLoader() {
	return await requireAuth();
}

export default Test;
