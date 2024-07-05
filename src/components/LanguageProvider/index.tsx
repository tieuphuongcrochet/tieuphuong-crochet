import React, { useState } from "react";
import { IntlProvider } from "react-intl";
import { LANGUAGES } from "utils";

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
	const newLocale = locale.includes('vi') ? LANGUAGES.VN : LANGUAGES.EN;

	const messages = require(`translation/${newLocale}.ts`).default;

	return (
		<Context.Provider value={{locale: newLocale, setLocale }}>
			<IntlProvider
				locale={newLocale}
				key={newLocale}
				messages={messages}
			>
				{React.Children.only(children)}
			</IntlProvider>
		</Context.Provider>
	);
}

export default LanguageProvider;