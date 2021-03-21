/* eslint-disable no-useless-computed-key */

import React, { useState, useRef, useEffect, ReactNode } from 'react';
import classnames from 'classnames';

import Icon from '../Icon';

import './Select.scss';

type SelectT = {
  id?: string;
  label?: string;
  /**
   * Puede ser el valor de un parametro de un objeto, string o numero
   */
  value?: string | number;
  /**
   * El objeto completo en caso de querer pasarlo
   */
  valueObject?: any;
  disabled?: boolean;
  hasError?: boolean;
  feedback?: string;
  required?: boolean;
  /**
   * Puede ser una lista de objeto, string o numero
   */
  options: any[];
  customOption?: (option: any) => ReactNode;
  customText?: (option: any) => ReactNode;
  /**
   * Propiedad del objeto (en caso que sea objeto) que se va a devolver del select.
   * Por defecto si es un objeto se devuelve completo
   */
  valueProp?: string;
  /**
   * Propiedad del objeto (en caso que sea objeto) que se va a mostrar en el select
   */
  textProp?: string;
  filteredBy?: string[];
  /**
   * Funcion que devuelve el valor del select (que puede ser prop del objeto o directo lo que esta listado en options)
   */
  onChange: (option: any) => void;
  className?: string;
  classNameContainer?: string;
};

const optionsHeightSize = 40;
const breakPointMd = 768;
const regExpAccents = /[\u0300-\u036f]/g;
const regExpLettersAccents = /[À-ÿ]+/;
const unicode = 'NFD';

const searchOverQuestion = (questionTitle: string, input: string) => {
  return regExpLettersAccents.test(input)
    ? questionTitle.toLowerCase().includes(input.toLowerCase())
    : questionTitle
        .toLowerCase()
        .normalize(unicode)
        .replace(regExpAccents, '')
        .includes(input.toLowerCase());
};

function Select({
  id,
  label,
  value,
  valueObject,
  disabled = false,
  hasError = false,
  feedback,
  required = true,
  options,
  customOption,
  customText,
  valueProp,
  textProp,
  filteredBy,
  onChange,
  className,
  classNameContainer,
}: SelectT) {
  const selectRef = useRef<HTMLDivElement>(null);
  const selectOptionsRef = useRef<HTMLDivElement>(null);

  const getInitialInfo = (
    newValue: string | number | undefined,
    newValueObject: any,
    newOptions: any[]
  ) => {
    let initialOption =
      newValue && valueProp
        ? newOptions.find((option: any) => option[valueProp] === newValue)
        : newValue;

    initialOption = newValueObject || initialOption || '';

    const initialText = initialOption && textProp ? initialOption[textProp] : initialOption;
    const initialValue = initialOption && valueProp ? initialOption[valueProp] : initialOption;

    return { initialText, initialValue };
  };

  const { initialValue, initialText } = getInitialInfo(value, valueObject, options);

  const [inputSearch, setInputSearch] = useState<string | number>(initialText);
  const [finalInfo, setFinalInfo] = useState({
    text: initialText,
    value: initialValue,
  });
  const [optionsFiltered, setOptionsFiltered] = useState<any[]>(options);

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [visited, setVisited] = useState<boolean>(false);
  const [optionsUp, setOptionsUp] = useState<boolean>(false);
  const [isFocusByIcon, setIsFocusByIcon] = useState<boolean>(false);

  const feedbackText = !!feedback
    ? feedback
    : `Olvidaste seleccionar ${label ? label?.toLocaleLowerCase() : 'este campo'}`;

  const selectContainerClasses = classnames('select_container', {
    [`${classNameContainer}`]: classNameContainer,
  });
  const selectClasses = classnames('select', {
    ['select_floating_label']: label,
    ['select_filled']: isExpanded || !!value || !!valueObject,
    ['select_error']: hasError || showError,
    ['select_focus_icon']: isFocusByIcon,
    [`${className}`]: className,
  });
  const selectOptionsClasses = classnames('select_options', {
    ['select_options_up']: optionsUp,
  });
  const selectOptionClasses = (option: any) => {
    const valueOption = valueProp ? option[valueProp] : option;
    const textOption = textProp ? option[textProp] : option;

    const isSelected =
      (!!textProp && !!valueObject && valueObject[textProp] === textOption) ||
      value === valueOption;

    return classnames('select_option', {
      ['selected']: isSelected,
    });
  };

  const expandOptions = () => {
    setVisited(true);
    setIsExpanded(true);
  };
  const selectClickOutHandler = async (event: any) => {
    if (
      selectRef.current &&
      selectRef.current?.contains(selectOptionsRef?.current) &&
      !selectRef.current.contains(event.target)
    ) {
      setIsExpanded(false);
    }
  };
  const onClickIconHandler = () => {
    if (!isExpanded) {
      setIsFocusByIcon(true);
      expandOptions();
    } else {
      setIsExpanded(false);
    }
  };

  const onChangeHandler = (event: any) => {
    const { value } = event.target;

    setInputSearch(value);

    const filtered = options.filter((option: any) => {
      if (!!filteredBy?.length) {
        let aux = false;
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < filteredBy.length; i++) {
          if (searchOverQuestion(option[filteredBy[i]], value)) {
            aux = true;

            break;
          }
        }

        return aux;
      }

      return searchOverQuestion(option, value);
    });

    setOptionsFiltered(filtered);
  };
  const selectOptionHandler = (option: any) => {
    const valueOption = valueProp ? option[valueProp] : option;
    const textOption = textProp ? option[textProp] : option;

    setFinalInfo({
      text: textOption,
      value: valueOption,
    });
    setInputSearch(textOption);
    setShowError(!valueOption);
    onChange(valueOption);
    setIsExpanded(false);
  };

  useEffect(() => {
    if (!isExpanded && visited && required && !value && !valueObject) {
      setShowError(true);
    }

    if (!isExpanded) {
      setOptionsFiltered(options);
      setInputSearch(finalInfo.text);
      setIsFocusByIcon(false);
    }

    if (isExpanded) {
      const maxOptionsHeightDesktopSize = 272;
      const maxOptionsHeightMobileSize = 152;
      const spacingHeightSize = 56;

      const maxOptionsHeightsize =
        window.innerWidth > breakPointMd ? maxOptionsHeightDesktopSize : maxOptionsHeightMobileSize;

      const bottomSelect = selectRef.current?.getBoundingClientRect().bottom || 0;
      const lengthOptionsHeight = options.length * optionsHeightSize;
      const heightMenu =
        lengthOptionsHeight < maxOptionsHeightsize ? lengthOptionsHeight : maxOptionsHeightsize;

      setOptionsUp(bottomSelect + heightMenu + spacingHeightSize > window.innerHeight);
    }
  }, [isExpanded]);

  useEffect(() => {
    const { initialText, initialValue } = getInitialInfo(value, valueObject, options);

    setInputSearch(initialText);
    setFinalInfo({
      text: initialText,
      value: initialValue,
    });
    setOptionsFiltered(options);
  }, [value, valueObject, options]);

  useEffect(() => {
    window.addEventListener('click', selectClickOutHandler, false);

    return () => {
      window.removeEventListener('click', selectClickOutHandler, false);
    };
  }, []);

  return (
    <div id={id} className={selectContainerClasses} ref={selectRef}>
      <div>
        <input
          type="text"
          value={isExpanded ? inputSearch : ''}
          className={selectClasses}
          disabled={disabled}
          onClick={expandOptions}
          onChange={onChangeHandler}
          required
        />
        {!isExpanded && (
          <div className="select_text">
            {!customText ? (
              <span className="select_text_text">{finalInfo.text}</span>
            ) : (
              customText(finalInfo.value)
            )}
          </div>
        )}

        {(showError || hasError) && feedbackText && !disabled && (
          <span className="select_feedback">{feedbackText}</span>
        )}

        {label && <span className="select_label">{label}</span>}

        <Icon
          name={isExpanded ? 'expand_less' : 'expand_more'}
          className="select_icon"
          size="medium"
          onClick={onClickIconHandler}
        />
      </div>

      {isExpanded && (
        <div className={selectOptionsClasses} ref={selectOptionsRef}>
          {optionsFiltered.map((option: any, key: number) => (
            <div
              key={`select_option_${key}`}
              className={selectOptionClasses(option)}
              onClick={() => selectOptionHandler(option)}
              onKeyPress={() => selectOptionHandler(option)}
              tabIndex={0}
              role="button"
            >
              {customOption ? (
                customOption(option)
              ) : (
                <span>{textProp ? option[textProp] : option}</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Select;
