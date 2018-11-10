import React from 'react'
import PropTypes from 'prop-types'
import _times from 'lodash/times'
import ToggleHOC from './ToggleHOC'

import styled from 'styled-components'
import { lighten, modularScale } from 'polished'

const Menu = styled.div`
    width: ${(props) => props.size}px;
    height: ${(props) => props.size}px;
    margin: 0 auto;
    background-color: ${(props) =>
        props.style
            ? props.style.backgroundColor
                ? props.style.backgroundColor
                : 'black'
            : 'black'};
    display: inline-flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    cursor: pointer;
`

const wtf = (props) => {
    switch (props.type) {
        case 1:
            if (!props.isOpen) {
                return `
                    span {
                        &:nth-child(1) {
                            top: 0;
                        }
                        &:nth-child(2) {
                            top: ${(props.size * 0.45) / 2 - props.thick / 2}px;
                        }

                        &:nth-child(3) {
                            top: ${props.size * 0.45 - props.thick}px;
                        }
                    }`
            } else {
                return `
                    span {
                        &:nth-child(1) {
                            top: ${(props.size * 0.45) / 2 - props.thick / 2}px;
                            transform: rotate(135deg);
                        }
                        &:nth-child(2) {
                            opacity: 0;
                            top: ${(props.size * 0.45) / 2 - props.thick / 2}px;
                            left: ${props.size * 0.6 * -1}px;
                        }
                        &:nth-child(3) {
                            top: ${(props.size * 0.45) / 2 - props.thick / 2}px;
                            transform: rotate(-135deg);
                        }
                    }`
            }
            break
        case 3:
            if (!props.isOpen) {
                return `
                    span {
                        &:nth-child(1) {
                            top: 0;
                        }
                        &:nth-child(2),
                        &:nth-child(3) {
                            top: ${(props.size * 0.45) / 2 - props.thick / 2}px;
                        }

                        &:nth-child(3) {
                            top: ${props.size * 0.45 - props.thick}px;
                        }
                    }`
            } else {
                return `
                    span {
                        &:nth-child(1) {
                            top: ${(props.size * 0.45) / 2 - props.thick / 2}px;
                            width: 0%;
                            left: 50%;
                        }
                        &:nth-child(2) {
                            top: ${(props.size * 0.45) / 2 - props.thick / 2}px;
                            transform: rotate(45deg);
                        }
                        &:nth-child(3) {
                            top: ${(props.size * 0.45) / 2 - props.thick / 2}px;
                            transform: rotate(-45deg);
                        }

                        &:nth-child(4) {
                            top: ${(props.size * 0.45) / 2 - props.thick / 2}px;
                            width: 0%;
                            left: 50%;
                        }
                    }`
            }
            break
        case 4:
            if (!props.isOpen) {
                return `
                    span {
                        &:nth-child(1) {
                            top: 0;
                            transform-origin: left center;
                        }
                        &:nth-child(2) {
                            top: ${(props.size * 0.45) / 2 - props.thick / 2}px;
                            transform-origin: left center;
                        }

                        &:nth-child(3) {
                            top: ${props.size * 0.45 - props.thick}px;
                            transform-origin: left center;
                        }
                    }`
            } else {
                const lineW = Math.ceil(Math.sin((45 * Math.PI) / 180) * (props.size * 0.6))
                const w = props.size * 0.6
                const t2 = props.thick / 2
                return `
                    span {
                        &:nth-child(1) {
                            transform: rotate(45deg);
                            top: -${t2 / 2}px;
                            left: ${(w - lineW) / 2 + t2}px;
                            transform-origin: left top;
                        }
                        &:nth-child(2) {
                            width: 0%;
                            opacity: 0;
                            top: ${(props.size * 0.45) / 2 - props.thick / 2}px;
                            transform-origin: left center;
                        }
                        &:nth-child(3) {
                            transform: rotate(-45deg);
                            top: ${props.size * 0.45 - props.thick + props.thick / 2}px;
                            left: ${(w - lineW) / 2}px;
                            transform-origin: left top;
                        }
                    }`
            }
            break
        default:
            break
    }
}

const HamburguerHolder = styled.div`
    width: ${(props) => props.size * 0.6}px;
    height: ${(props) => props.size * 0.45}px;
    position: relative;
    transform: rotate(0deg);
    transition: 0.5s ease-in-out;
    span {
        display: block;
        position: absolute;
        height: ${(props) => props.thick}px;
        width: 100%;
        background: ${(props) =>
            props.style ? (props.style.color ? props.style.color : 'white') : 'white'};
        border-radius: ${(props) => props.thick}px;
        opacity: 1;
        left: 0;
        transform: rotate(0deg);
        transition: 0.25s ease-in-out;
    }
    ${(props) => wtf(props)};
`

const MenuHamburgerStyled = (props) => {
    const spans = (type) => {
        switch (type) {
            case 1:
                return 3
            case 2:
                return 6
            case 3:
                return 4
            case 4:
                return 3
            default:
                return 3
        }
    }
    return (
        <Menu size={props.size} style={props.style} onClick={props.onToggleHandler}>
            <HamburguerHolder
                type={props.type}
                isOpen={props.isOpen}
                size={props.size}
                style={props.style}
                thick={props.thick || props.size * 0.1}
            >
                {_times(spans(props.type), (t) => {
                    return <span key={t} />
                })}
            </HamburguerHolder>
        </Menu>
    )
}
MenuHamburgerStyled.propTypes = {
    type: PropTypes.oneOf([1, 2, 3, 4]).isRequired,
    size: PropTypes.number.isRequired,
    thick: PropTypes.number,
    style: PropTypes.object,
}
MenuHamburgerStyled.defaultProps = {
    type: 1,
    size: 100,
}
export default ToggleHOC(MenuHamburgerStyled)
