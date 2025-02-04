<script lang="ts">
  import { _ } from 'svelte-i18n';
  import Button from '$lib/components/UI/Button.svelte';
  import routes from '$lib/routes';
  import Heading from '../_components/Heading.svelte';
  import MarketingBlock from '../_components/MarketingBlock.svelte';
  import PaddedSection from '../_components/PaddedSection.svelte';
  import Features from '../_sections/Features.svelte';
  import InnerVideoSection from '../_sections/VideoSection.svelte';
  import SupportReasons from '../_sections/SupportReasons.svelte';
  import CollapsibleGroup from '$lib/components/CollapsibleGroup.svelte';
  import Testimonials from '../_components/Testimonials.svelte';
  import type { Slide } from '../_components/Testimonials.svelte';
  import { coreTeamProfiles } from '../_static/profiles';
  import ProfilePicture from '../_components/ProfilePicture.svelte';
  import { SUPERFAN_PRICING_ROUTE, SUPPORT_EMAIL } from '$lib/constants';
  import { getNodeKeys } from '$lib/util/get-node-children';
  import { onDestroy } from 'svelte';

  let testimonials: Slide[];

  const contentOf = (quoteNumber: string) => {
    const prefix = `about-superfan.superfan-quotes-section.quotes.${quoteNumber}`;
    return {
      name: $_(prefix + '.name'),
      quote: $_(prefix + '.quote')
    };
  };

  const setTestimonials = () => {
    testimonials = [
      {
        ...contentOf('0'),
        imagePath: '/testimonials/boris.jpeg'
      },
      {
        ...contentOf('1'),
        imagePath: '/testimonials/marie-marth.jpg'
      },
      {
        ...contentOf('2'),
        imagePath: '/testimonials/benoit-helene.jpg'
      }
    ];
  };

  setTestimonials();

  const unsubscribeLocalization = _.subscribe(() => {
    setTestimonials();
  });
  onDestroy(() => {
    unsubscribeLocalization();
  });
</script>

<PaddedSection desktopOnly>
  <MarketingBlock backgroundColor="var(--color-green-light)" centered>
    <h1>{$_('about-superfan.top-section.title')}</h1>
    <p>{$_('about-superfan.top-section.description')}</p>
  </MarketingBlock>
</PaddedSection>
<PaddedSection>
  <InnerVideoSection>
    <h2 slot="heading">{$_('about-superfan.video-section.title')}</h2>
    <div slot="text" class="video-text">
      {@html $_('about-superfan.video-section.description')}
      <Button href={SUPERFAN_PRICING_ROUTE} uppercase orange arrow
        >{$_('generics.become-superfan')}</Button
      >
    </div>
  </InnerVideoSection>
</PaddedSection>
<PaddedSection backgroundColor="var(--color-beige-light)" vertical>
  <Heading caption={$_('about-superfan.for-superfans-section.slug')}
    >{$_('about-superfan.for-superfans-section.title')}</Heading
  >
  <p>{$_('about-superfan.for-superfans-section.description')}</p>
  <Features backgroundColor="white" />
  <div style="width: 100%; padding-bottom: var(--section-inner-padding)" />
  <Heading caption={$_('about-us.for-everyone')}
    >{$_('superfan-shared.three-support-reasons.title')}</Heading
  >
  <SupportReasons backgroundColor="white" />
  <div style="margin-bottom: var(--spacing-medium)" />
  <Button href={SUPERFAN_PRICING_ROUTE} uppercase orange arrow centered
    >{$_('generics.become-superfan')}</Button
  >
</PaddedSection>
<PaddedSection desktopOnly>
  <MarketingBlock centered backgroundColor="var(--color-beige-light">
    <div class="team-pictures">
      {#each Object.values(coreTeamProfiles) as profileData}
        <div class="image-wrapper">
          <ProfilePicture {...profileData} />
        </div>
      {/each}
    </div>
    <h2 class="team-title">{$_('about-superfan.team-section.title')}</h2>
    <p class="team-text">{$_('about-superfan.team-section.description')}</p>
    <Button href={routes.ABOUT_US} uppercase orange arrow centered
      >{$_('about-superfan.team-section.meet-team-button')}</Button
    >
  </MarketingBlock>
</PaddedSection>
<PaddedSection desktopOnly>
  <Testimonials slides={testimonials} />
</PaddedSection>
<PaddedSection desktopOnly>
  <h2 class="faq-heading">{$_('about-superfan.faq-section.title')}</h2>
  {#each getNodeKeys('about-superfan.faq-section.faq-subsections') as sectionKey}
    <div class="faq-section">
      <h3 class="faq-title">
        {$_(`about-superfan.faq-section.faq-subsections.${sectionKey}.title`)}
      </h3>
      <CollapsibleGroup
        collapsibleKey={`about-superfan.faq-section.faq-subsections.${sectionKey}.questions`}
      />
    </div>
  {/each}
</PaddedSection>
<PaddedSection>
  <div class="more-questions">
    <h2>{$_('about-superfan.faq-section.contact-section.title')}</h2>
    <!-- TODO: fix the mailto localization -->
    <Button
      href="mailto:{SUPPORT_EMAIL}?subject={encodeURIComponent('WTMG, I have a question!')}"
      uppercase>{$_('about-superfan.faq-section.contact-section.contact-button')}</Button
    >
  </div>
</PaddedSection>

<style>
  .more-questions {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .team-title,
  :global(div) p.team-text {
    margin-bottom: 1rem;
  }

  /* Not an ideal escape, maybe MarketingBlock should
    contain less strict styling. */
  :global(div) p.team-text {
    display: inline-block;
    max-width: 49rem;
  }

  .team-pictures {
    display: flex;
    justify-content: center;
    width: 100%;
    /* Compensate for the negative margins below */
    transform: translateX(1.75rem);
  }

  .image-wrapper {
    /* This gives the elements a concrete width */
    max-width: 18rem;
    flex-grow: 1;
    max-height: 100%;
    margin-left: -3.5rem;
  }

  .faq-section {
    margin-bottom: var(--section-inner-padding);
  }

  .faq-heading {
    text-align: center;
  }

  .faq-title {
    display: inline-block;
    margin-bottom: 2rem;
    padding: 0 var(--spacing-collapsible-item-hor);
  }

  @media screen and (max-width: 1050px) {
    /* Center the video section button, only when it collapses */
    .video-text :global(.button) {
      margin: auto;
    }
  }
</style>
