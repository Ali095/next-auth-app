// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React, { useState } from 'react';
import { SelectOption } from '../../../@types/typings';
import { countries, paymentOptions } from '../../../data/selectOptions';
import styles from './form.module.scss';
import Icon from '../../Icons/Icons';
import InputGroup from '../../InputGroup/InputGroup';
import Select from '../../Select/Select';
import { IMaskInput, IMask } from 'react-imask';

const PaymentCardForm = () => {
    const [name, setName] = useState('Hashim Mansoor');
    const [cardNumber, setCardNumber] = useState('');
    const [cardExpiry, setCardExpiry] = useState('');
    const [cardCvc, setCardCvc] = useState('');
    const [paymentOption, setPaymentOption] = useState<SelectOption | undefined>(paymentOptions[0]);
    const [country, setCountry] = useState<SelectOption | undefined>(countries[0]);
    const [cardType, setCardType] = useState('');
    const [cardIcon, setCardIcon] = useState('card');

    const creditCardMask = [
        {
            mask: '0000 000000 00000',
            regex: '^3[47]\\d{0,13}',
            cardType: 'american express',
            icon: 'americanExpress',
        },
        {
            mask: '0000 0000 0000 0000',
            regex: '^(?:6011|65\\d{0,2}|64[4-9]\\d?)\\d{0,12}',
            cardType: 'discover',
            icon: 'discover',
        },
        {
            mask: '0000 000000 0000',
            regex: '^3(?:0([0-5]|9)|[689]\\d?)\\d{0,11}',
            cardType: 'diners',
            icon: 'diners',
        },
        {
            mask: '0000 0000 0000 0000',
            regex: '^(5[1-5]\\d{0,2}|22[2-9]\\d{0,1}|2[3-7]\\d{0,2})\\d{0,12}',
            cardType: 'mastercard',
            icon: 'mastercard',
        },
        {
            mask: '0000 000000 00000',
            regex: '^(?:2131|1800)\\d{0,11}',
            cardType: 'jcb15',
            icon: 'jcb15',
        },
        {
            mask: '0000 0000 0000 0000',
            regex: '^(?:35\\d{0,2})\\d{0,12}',
            cardType: 'jcb',
            icon: 'jcb',
        },
        {
            mask: '0000 0000 0000 0000',
            regex: '^(?:5[0678]\\d{0,2}|6304|67\\d{0,2})\\d{0,12}',
            cardType: 'maestro',
            icon: 'maestro',
        },
        {
            mask: '0000 0000 0000 0000',
            regex: '^4\\d{0,15}',
            cardType: 'visa',
            icon: 'visa',
        },
        {
            mask: '0000 0000 0000 0000',
            regex: '^62\\d{0,14}',
            cardType: 'unionpay',
            icon: 'unionpay',
        },
        {
            mask: '0000 0000 0000 0000',
            cardType: 'Unknown',
            icon: 'card',
        }
    ];

    const blocks = {
        YY: {
            mask: '000',
        },

        MM: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 12
        }
    };

    function creditCardMaskDispatch(appended: string, dynamicMasked: IMask.MaskedDynamic) {
        const number = (dynamicMasked.value + appended).replace(/\D/g, '');

        for (let i = 0; i < dynamicMasked.compiledMasks.length; i++) {
            const re = new RegExp(dynamicMasked.compiledMasks[i].regex);
            if (number.match(re) != null) {
                return dynamicMasked.compiledMasks[i];
            }
        }
    }

    function creditCardAccept(value: string, mask: IMask.InputMask<IMask.AnyMaskedOptions>) {
        const type = mask.masked.currentMask.cardType;
        const icon = mask.masked.currentMask.icon;
        setCardType(type);
        setCardIcon(icon);
        setCardNumber(value);
    }

    return (
        <div className={styles.form}>
            <div className={styles.header}>
                <div className={styles.title}>
                    <span className={styles.icon}>
                        <Icon name={cardIcon} />
                    </span>
                    <span className={styles.text}>Edit card</span>
                </div>

                <div className={styles.switch}>
                    <p>Switch payment method</p>

                    <Select
                        value={paymentOption}
                        options={paymentOptions}
                        onChange={o => setPaymentOption(o)}
                        style={{ minWidth: '220px' }}
                    />
                </div>
            </div>

            <InputGroup label='Name' required>
                <input
                    type="text"
                    defaultValue={'Hashim Mansoor'}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </InputGroup>

            <div className={styles.group}>
                <InputGroup label='Card number' required>
                    <IMaskInput
                        mask={creditCardMask}
                        value={cardNumber}
                        placeholder="1234 1234 1234 1234"

                        onAccept={creditCardAccept}

                        dispatch={creditCardMaskDispatch}
                    />
                </InputGroup>

                <InputGroup label='Expiry' required>
                    <IMaskInput
                        mask={Date}
                        pattern={'MM / YY'}
                        value={cardExpiry}
                        blocks={blocks}
                        onAccept={(value) => setCardExpiry(value as string)}

                        placeholder="MM / YY"
                    />
                </InputGroup>

                <InputGroup label='CVC' required>
                    <IMaskInput
                        mask={'000'}
                        value={cardCvc}
                        blocks={blocks}
                        onAccept={(value) => setCardCvc(value as string)}

                        placeholder="CVC"
                    />
                </InputGroup>
            </div>
            <InputGroup label='Country' required>
                <Select
                    value={country}
                    options={countries}
                    onChange={o => setCountry(o)}
                />
            </InputGroup>

            <button
                className='btn__transparent'
                style={{ marginTop: '24px' }}
            >Update Card</button>
        </div>
    );
};

export default PaymentCardForm;
