import React from "react";
import { FormattedNumber } from "react-intl";
import { CURRENCY } from "utils";

interface Props {
	price?: number;
	currency_code?: string;
}

const FormattedCurrency = ({price, currency_code}: Props) => {
	return (
		<div className='price-wrap'>
			{currency_code === CURRENCY.USD &&
				// eslint-disable-next-line react/style-prop-object
				<FormattedNumber value={price || 0} style="currency" currency={currency_code} />
			}
			{currency_code === CURRENCY.VND &&
				<>
					<FormattedNumber value={price || 0} />
					<span> VND</span>
				</>
			}
		</div>
	)
}

export default FormattedCurrency;
