"use client";

import React from "react";
import { AddressSuggestions } from "react-dadata";
import "react-dadata/dist/react-dadata.css";

interface Props {
  onChange?: (value?: string) => void;
}

export const AddressInput: React.FC<Props> = ({ onChange }) => {
  return (
    <AddressSuggestions
      token="b3229e4b555983af3c13174a04758d35e000e10b"
      onChange={(data) => onChange?.(data?.value)}
    />
  );
};
