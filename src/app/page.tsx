import { ChatbotWidget } from "@/components/chatbot/chatbot-widget";
import OrkaitReflection from "@/components/sections/home/hero";
import Navbar from "@/components/sections/home/Navbar";

export default function Home() {
	return (
		<main>
			<Navbar />
			<OrkaitReflection />
			<ChatbotWidget />
		</main>
	);
}
