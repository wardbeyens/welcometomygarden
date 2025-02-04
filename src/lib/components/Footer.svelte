<script lang="ts">
  import { _ } from 'svelte-i18n';
  import routes from '$lib/routes';
  import { DONATION_URL, mailToSupportHref } from '$lib/constants';
  import Socials from './Socials.svelte';
  import LanguageSelector from './LanguageSelector.svelte';
  import WtmgLogo from './UI/WTMGLogo.svelte';
  import PaddedSection from '$routes/(marketing)/_components/PaddedSection.svelte';
  import { user } from '$lib/stores/auth';

  const donationUrlParams = new URLSearchParams({
    ...($user
      ? {
          prefilled_email: $user.email,
          client_reference_id: $user.id
        }
      : {}),
    utm_source: 'welcometomygarden.org',
    utm_medium: 'web',
    utm_campaign: 'donation_payment',
    utm_content: 'footer'
  });

  type Link = {
    title: string;
    link: string;
    target?: '_blank';
  };

  type Category = {
    title: string;
    links: Link[];
  };

  let categories: Category[];
  $: categories = [
    {
      title: $_('generics.wtmg.acronym'),
      links: [
        {
          title: $_('generics.map'),
          link: routes.MAP
        },
        {
          title: $_('generics.about-us'),
          link: routes.ABOUT_US
        },
        {
          title: $_('footer.links.superfans'),
          link: routes.ABOUT_SUPERFAN
        },
        {
          title: $_('footer.links.donate'),
          link: `${DONATION_URL}?${donationUrlParams.toString()}`,
          target: '_blank'
        }
      ]
    },
    {
      title: $_('footer.link-category-titles.our-projects'),
      links: [
        {
          title: $_('generics.slowby'),
          link: `${$_(
            'generics.slowby-url'
          )}?utm_source=welcometomygarden.org&utm_medium=web&utm_content=footer`,
          target: '_blank'
        },
        {
          title: $_('footer.links.velotour.title'),
          link: $_('footer.links.velotour.url'),
          target: '_blank'
        },
        {
          title: $_('footer.links.women-dont-cycle.title'),
          link: $_('footer.links.women-dont-cycle.url'),
          target: '_blank'
        }
      ]
    },
    {
      title: $_('footer.link-category-titles.learn-more'),
      links: [
        {
          title: $_('generics.rules'),
          link: routes.RULES
        },
        {
          title: $_('generics.faq.acronym'),
          link: routes.FAQ
        },
        {
          title: $_('footer.links.get-in-touch'),
          link: mailToSupportHref
        }
      ]
    }
  ];
</script>

<PaddedSection is="footer" vertical backgroundColor="var(--color-beige-light)">
  <div class="wrapper">
    <div class="top">
      <div class="left">
        <WtmgLogo is="span" />
        <div class="language-selector"><LanguageSelector /></div>
        <div class="socials">
          <Socials small />
        </div>
      </div>
      <div class="right">
        {#each categories as { title: categoryTitle, links }}
          <ul class="category">
            <span class="title">
              {categoryTitle}
            </span>
            <ul class="links">
              {#each links as { title: linkTitle, link, target }}
                <li>
                  <a href={link} rel="noopener" {target}>{linkTitle}</a>
                </li>
              {/each}
            </ul>
          </ul>
        {/each}
      </div>
    </div>
    <div class="bottom">
      <p class="copyright">{$_('footer.copyright')}</p>
      <ul class="terms">
        <li>
          <a href={routes.PRIVACY_POLICY}>{$_('generics.privacy-policy')}</a>
        </li>
        <li>
          <a href={routes.TERMS_OF_USE}>{$_('generics.terms-of-use')}</a>
        </li>
        <li>
          <a href={routes.COOKIE_POLICY}>{$_('generics.cookie-policy')}</a>
        </li>
      </ul>
    </div>
  </div>
</PaddedSection>

<style>
  :global(body) {
    --height-footer: 18rem;
  }
  .wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
    /* box-shadow: 0px 0px 3.3rem rgba(0, 0, 0, 0.1); */
  }

  .top {
    width: 100%;
    display: flex;
    justify-content: space-between;
    /* TODO better, reusable color variable */
    border-bottom: 1px solid grey;
    padding-bottom: 4rem;
    gap: 2rem;
  }

  .bottom {
    padding-top: 4rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1 2;
  }

  /* Override WTMG logo height */
  .left :global(.title) {
    height: 4rem;
  }

  .terms {
    display: flex;
    align-items: center;
  }

  .terms li {
    padding: 0 1rem;
    line-height: 1.4;
    font-size: 1.3rem;
    font-weight: 500;
    border-right: 1px solid var(--color-green);
  }

  .terms li:last-child {
    border-right: 0;
  }

  .copyright {
    font-size: 1.3rem;
    font-weight: 500;
  }

  .socials {
    width: 18rem;
  }

  .socials :global(ul.socials) {
    justify-content: space-between;
  }

  .right {
    display: flex;
    flex: 1 1;
    gap: 7rem;
  }

  .category > .title {
    display: inline-block;
    font-weight: 600;
    line-height: 130%;
    margin-bottom: 1rem;
    min-width: 14rem;
  }

  .links {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .links > li {
    line-height: 1.3;
  }

  @media screen and (max-width: 1050px) {
    .copyright {
      max-width: 42vw;
    }
  }

  @media screen and (max-width: 900px) {
    .category > .title {
      min-width: 10rem;
    }

    .top {
      gap: 0.5rem;
    }

    .socials {
      width: 16rem;
    }
  }

  @media screen and (max-width: 767px) {
    .right {
      gap: 5rem;
    }
  }

  @media screen and (max-width: 700px) {
    /* Disable the footer on the map */
    :global(body footer) {
      display: none;
    }
    :global(body) {
      --footer-height: 0px;
    }
  }
</style>
