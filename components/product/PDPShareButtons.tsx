import Icon from "$store/components/ui/Icon.tsx";

export default function PDPShareButtons() {
  const handleShare = () => {
    // Get the current page URL
    const currentUrl = window.location.href;

    // Construct the WhatsApp share URL
    const whatsappShareUrl = `https://api.whatsapp.com/send?text=${
      encodeURIComponent(currentUrl)
    }`;

    // Open a new window or redirect to the WhatsApp share URL
    globalThis.window.open(whatsappShareUrl, "_blank");
  };

  const handleCopyToClipboard = () => {
    // Get the current page URL
    const currentUrl = window.location.href;

    // Create a textarea element to hold the URL temporarily
    const textarea = document.createElement("textarea");
    textarea.value = currentUrl;

    // Append the textarea to the document
    document.body.appendChild(textarea);

    // Select the URL in the textarea
    textarea.select();

    // Copy the selected text to the clipboard
    document.execCommand("copy");

    // Remove the textarea from the document
    document.body.removeChild(textarea);

    // You can also provide user feedback here, e.g., show a notification
    alert("URL copiada!");
  };

  return (
    <div class="flex gap-2 items-center mb-2 mt-4 sm:mt-0 sm:mb-4">
      <span class="font-normal text-xs">Compartilhar:</span>
      <button
        class="btn btn-outline btn-sm border-[#cecece] rounded-full"
        onClick={handleShare}
        aria-label={"WhatsApp"}
      >
        <Icon id="WhatsApp" size={16} />
        <span class="font-normal text-xs">WhatsApp</span>
      </button>
      <button
        class="btn btn-outline btn-sm border-[#cecece] rounded-full"
        onClick={handleCopyToClipboard}
        aria-label={"Copy"}
      >
        <Icon id="Copy" size={16} />
        <span class="font-normal text-xs">Copiar Link</span>
      </button>
    </div>
  );
}
