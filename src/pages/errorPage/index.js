import { Button, Result } from "antd";
import { Link, useRouteError } from "react-router-dom";
import { ROUTE_PATH } from "utils";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <Result
      status="500"
      title="500"
      subTitle="Sorry, something went wrong."
      extra={<Button type="primary"><Link to={ROUTE_PATH.HOME}>Back Home</Link></Button>}
    />
  );
}
