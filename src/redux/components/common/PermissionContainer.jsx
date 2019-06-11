import React from 'react';
class PermissionContainer extends React.PureComponent {
    render() {
        const { display, permission, children } = this.props;
        const needPermission = permission || [];
        const role = localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).role;
        const userPermission =JSON.parse(localStorage.getItem("permission"));
        let hasPermission = role=="admin";
        if (!hasPermission && needPermission.length > 0) {
            for (let p of needPermission) {
                if (userPermission.some(s => s === p)) {
                    hasPermission = true;
                    break;
                }
            }
        }
        return (
            display === "block" ?
                <div>
                    {hasPermission ? children : null}
                </div>
                :
                <span>
                    {hasPermission ? children : null}
                </span>

        )
    }
}

export default PermissionContainer;