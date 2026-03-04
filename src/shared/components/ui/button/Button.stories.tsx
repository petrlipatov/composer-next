import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "text"],
      description: "The visual style of the button.",
    },
    size: {
      control: { type: "select" },
      options: ["s", "m", "l", "xl"],
      description: "The size of the button.",
    },
    isLoading: {
      control: "boolean",
      description: "If true, shows a loading spinner.",
    },
    disabled: {
      control: "boolean",
      description: "If true, the button will be disabled.",
    },
    loadingText: {
      control: "text",
      description: "Text to display when isLoading is true.",
    },
    children: {
      control: "text",
      description: "The content of the button.",
    },
    onClick: { action: "clicked" },
  },
  args: {
    children: "Button Text",
    disabled: false,
    isLoading: false,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
};

export const Text: Story = {
  args: {
    variant: "text",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled Button",
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    children: "Loading...",
  },
};

export const LoadingWithText: Story = {
  args: {
    isLoading: true,
    loadingText: "Submitting",
    children: "Will not be shown",
  },
};

export const AllSizes: Story = {
  name: "Sizes",
  render: (args) => (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <Button {...args} size="s">
        Small
      </Button>
      <Button {...args} size="m">
        Medium
      </Button>
      <Button {...args} size="l">
        Large
      </Button>
      <Button {...args} size="xl">
        Extra Large
      </Button>
    </div>
  ),
};
