import { Grid } from "antd";

export default function useResponsive() {
  const screens = Grid.useBreakpoint();

  return screens;
}
