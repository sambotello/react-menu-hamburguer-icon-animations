import React from 'react'

const ToggleHOC = (WrappedComponent) => {
    return class ToggleHOC extends React.Component {
        state = {
            isOpen: false,
        }
        onToggleHandler = () => {
            this.setState({ isOpen: !this.state.isOpen })
        }
        render() {
            // Wraps the input component in a container, without mutating it. Good!
            return (
                <WrappedComponent
                    {...this.props}
                    isOpen={this.state.isOpen}
                    onToggleHandler={this.onToggleHandler}
                />
            )
        }
    }
}

export default ToggleHOC
