import { useUser } from "apps/vtex/hooks/useUser.ts";
import Button from "$store/components/ui/Button.tsx";
import { useSignal } from "@preact/signals";

export default function User() {
  const { user } = useUser();
  const vtexIdScriptsLoaded = useSignal(false);
  const isUserLoggedIn = Boolean(user.value?.email);

  const username = user?.value?.name ?? user?.value?.givenName ??
    user?.value?.email ?? "";

  return (
    <>
      {user.value
        ? (
          <>
            <label tabIndex={0} class="font-bold uppercase text-xs truncate">
              Olá, {username?.substring(0, 10)?.concat("...")}
            </label>
          </>
        )
        : (
          <Button
            as="Button"
            href="/account"
            aria-label="go to login"
            class="btn btn-primary bg-[#252525] text-xs font-normal items-center flex-col justify-center pt-[15px]"
            onClick={async () => {
              if (isUserLoggedIn) {
                window.location.pathname = "/account";
              } else {
                const execute = () => {
                  vtexIdScriptsLoaded.value = true;
                  // deno-lint-ignore ban-ts-comment
                  // @ts-expect-error
                  window.vtexid.start({
                    userEmail: "",
                    locale: "pt-BR",
                    forceReload: false,
                  });
                };
                if (!vtexIdScriptsLoaded.value) {
                  const { loadVtexIdScripts } = await import(
                    "deco-sites/ligaretro/sdk/login.tsx"
                  );
                  loadVtexIdScripts(execute);
                } else {
                  execute();
                }
              }
            }}
          >
            Acessar minha conta
          </Button>
        )}
    </>
  );
}