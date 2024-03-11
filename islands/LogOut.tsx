import { useUser } from "apps/vtex/hooks/useUser.ts";

export default function LogOut() {
  const { user } = useUser();
  return (
    <>
      {user.value
        ? (
          <a
            href={"/api/vtexid/pub/logout?scope=ligaretro&returnUrl=https://ligaretro.deco.site/"}
            class="flex w-full"
            aria-label={"log out"}
          >
            SAIR
          </a>
        )
        : (
          <a href="/login" class="inline text-[9px] no-underline">
            Não tem cadastro? <span class="underline">Criar conta</span>
          </a>
        )}
    </>
  );
}
