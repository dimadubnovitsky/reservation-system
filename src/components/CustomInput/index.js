import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import MaskedInput from 'react-text-mask';

export const CustomInput = ({ type, disableZero, numberLimit, ...props }) => {
  let inputMask = [];
  if (type === 'number') {
    inputMask = createNumberMask({
      prefix: '',
      includeThousandsSeparator: false,
      allowDecimal: false,
      allowLeadingZeroes: true,
    });
  } else if (type === 'phone') {
    inputMask = [
      '+',
      '7',
      ' ',
      '(',
      /[1-9]/,
      /\d/,
      /\d/,
      ')',
      ' ',
      /\d/,
      /\d/,
      /\d/,
      '-',
      /\d/,
      /\d/,
      '-',
      /\d/,
      /\d/,
    ];
  }

  const pipe = (conformedValue) => {
    if (numberLimit && +conformedValue > numberLimit) {
      return false;
    }
    if (disableZero && conformedValue !== '' && +conformedValue === 0) {
      return false;
    }
    return conformedValue;
  };

  return <MaskedInput {...props} pipe={pipe} mask={inputMask} />;
};
