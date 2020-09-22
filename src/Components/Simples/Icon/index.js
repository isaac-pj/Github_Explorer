import React from 'react'
import * as Styled from './styles'
import codes from './codes'

export const Icon = ({ color, size, name, children }) =>
  <Styled.Icon color={color} size={size} className="material-icons" children={name || children} />

export const codepoints = codes