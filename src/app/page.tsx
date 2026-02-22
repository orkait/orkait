import OrkaitReflection from "@/src/components/sections/home/hero";
import Navbar from "@/src/components/sections/home/Navbar";
import Layout from "@/src/components/layout/page-wrapper";

export default function Home() {
	return (
		<Layout>
			<Navbar />
			<OrkaitReflection />
		</Layout>
	);
}
