import { ActionIcon, Anchor, createStyles, Group } from "@mantine/core";
import { MantineLogo } from "@mantine/ds";
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTube from "@mui/icons-material/YouTube";
import InstagramIcon from '@mui/icons-material/Instagram';

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: 120,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: `${theme.spacing.md}px ${theme.spacing.md}px`,

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
    },
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      marginTop: theme.spacing.lg,
      marginBottom: theme.spacing.sm,
    },
  },
}));

export interface FooterCenteredProps {
  links: { link: string; label: string }[];
}

function FooterCentered({ links }: FooterCenteredProps) {
  const { classes } = useStyles();
  const items = links.map((link) => (
    <Anchor<'a'>
      color="dimmed"
      key={link.label}
      href={link.link}
      sx={{ lineHeight: 1 }}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer}>
      <div className={classes.inner}>
        <Group className={classes.links}>{items}</Group>

        <Group spacing="xs" position="right" noWrap>
          <ActionIcon size="lg" variant="default" radius="xl">
            <TwitterIcon />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <YouTube />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <InstagramIcon />
          </ActionIcon>
        </Group>
      </div>
    </div>
  );
}
export default FooterCentered;