import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import type { SectionProps } from "deco/types.ts";
import Icon from "$store/components/ui/Icon.tsx";
import ShirtBannerVideo from "$store/islands/ShirtBannerVideo.tsx";

/**@titleby matcher */
export interface History {
  matcher: string;
  banner: {
    image: ImageWidget;
    alt: string;
  };
  videoUrl: string;
  /**
   * @title História da Camisa
   * @format html
   */
  historyText: string;
}

export interface Props {
  histories: History[];
}

export default function ShirtHistory(
  props: SectionProps<ReturnType<typeof loader>>,
) {
  const { history } = props;

  if (!history) {
    return null;
  }

  const { banner, videoUrl, historyText } = history;

  return (
    <div class="container py-8 my-16 flex flex-col items-center justify-center gap-14">
      <ShirtBannerVideo banner={banner} videoUrl={videoUrl} />
      <div class="flex justify-center">
        <span class="text-2xl font-semibold">História da Camisa</span>
      </div>
      <div
        class="max-w-[900px] flex flex-col gap-10 text-center text-lg"
        dangerouslySetInnerHTML={{ __html: historyText }}
      />
    </div>
  );
}

export const loader = (props: Props, req: Request) => {
  const { histories } = props;

  // console.log({ url: new URLPattern(req.url).pathname });

  const history = histories.find(({ matcher }) =>
    new URLPattern({ pathname: matcher }).test(req.url)
  );

  return { history };
};
