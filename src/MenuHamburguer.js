import React from 'react'
import PropTypes from 'prop-types'
import _times from 'lodash/times'
import ToggleHOC from './ToggleHOC'
import './MenuHamburger.scss'

import styled from 'styled-components'

const MenuHamburger = (props) => {
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
        <div className="wtf" onClick={props.onToggleHandler}>
            <div id={`nav-icon${props.type}`} className={props.isOpen ? 'open' : ''}>
                {_times(spans(props.type), (t) => {
                    return <span key={t} />
                })}
            </div>
        </div>
    )
}
MenuHamburger.propTypes = {
    type: PropTypes.oneOf([1, 2, 3, 4]).isRequired,
    size: PropTypes.number.isRequired,
}
MenuHamburger.defaultProps = {
    type: 1,
    size: 100,
}
export default ToggleHOC(MenuHamburger)
