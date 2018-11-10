import React from 'react'
import './App.scss'
import MenuHamburger from './MenuHamburguer'
import MenuHamburgerStyled from './MenuHamburgerStyled'
import _times from 'lodash/times'

const App = () => {
    return (
        <div style={{ marginTop: 10 }}>
            <div className="container">
                <p>Using Styled Components</p>
                <div style={{ display: 'inline-block', textAlign: 'center', width: '100%' }}>
                    <MenuHamburgerStyled />
                    &nbsp;
                    <MenuHamburgerStyled
                        type={3}
                        // size={80}
                        // thick={5}
                        // style={{ backgroundColor: 'blue', color: 'red' }}
                    />
                    &nbsp;
                    <MenuHamburgerStyled
                        type={4}
                        // size={100}
                        // thick={5}
                    />
                </div>
                <div>
                    <MenuHamburgerStyled size={30} />
                    &nbsp;
                    <MenuHamburgerStyled
                        type={3}
                        size={80}
                        // thick={5}
                        style={{ backgroundColor: 'pink', color: 'purple' }}
                    />
                    &nbsp;
                    <MenuHamburgerStyled type={4} thick={5} />
                </div>
                <p>Using SASS</p>
                {_times(4, (t) => {
                    return (
                        <div key={t}>
                            <MenuHamburger type={t + 1} size={100} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default App
