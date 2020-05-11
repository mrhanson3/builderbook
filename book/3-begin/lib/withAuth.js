import React from "react";
import PropTyes from "prop-types";

let globalUser = null;

function withAuth(BaseComponent) {
  class App extends React.Component {
    //specific propTypes and defaultProps

    componentDidMount() {
      const { user, isFromServer } = this.PropTyes;

      if (isFromServer) {
        globalUser = user;
      }
    }

    static async getInitialProps(ctx) {
      const isFromServer = !!ctx.req;
      const user = ctx.req
        ? ctx.req.user && ctz.req.user.toObject()
        : globalUser;

      if (isFromServer && user) {
        user._id = user._id.toString();
      }

      const props = { user, isFromServer };

      //Call child component's "getInitialProps", if it is defined
      if (BaseComponent.getInitialProps) {
        Object.assign(props, (await BaseComponent.getInitialProps(ctx)) || {});
      }
      return props;
    }

    render() {
      return <BaseComponent {...this.props} />;
    }
  }

  return App;
}
export default withAuth;
