import React, { useState } from "react";
import { IntlProvider } from "react-intl";

interface LanguageProviderProps {
	children: React.ReactNode
}

interface LanguageContext {
	locale: string;
	setLocale: Function
};

export const Context = React.createContext({} as LanguageContext);
const local = navigator.language;

const LanguageProvider = ({ children }: LanguageProviderProps) => {
	const [locale, setLocale] = useState(local);

	const messages = require(`translation/${locale}.ts`).default;

	return (
		<Context.Provider value={{ locale, setLocale }}>
			<IntlProvider
				locale={locale}
				key={locale}
				messages={messages}
			>
				{React.Children.only(children)}
			</IntlProvider>
		</Context.Provider>
	);
}

export default LanguageProvider;