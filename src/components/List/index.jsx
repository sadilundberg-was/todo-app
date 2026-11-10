"use client";

import { Button } from "@/components/ui/button";
import { ItemGroup } from "@/components/ui/item";
import { ListItem } from "@/components/List/Item";

/**
 * Data-driven list.
 *
 * Props:
 * - query     → react-query query result (whole object)
 * - mutations → map of named mutations used by item media/actions
 * - config    → {
 *     empty?, loading?,
 *     item: { key?, variant, size, title, description, media, actions }
 *   }
 *
 * item.key → unique field on each row (e.g. "id"). Falls back to index.
 */
export function List({ query, mutations, config }) {
  const { data, isLoading, isError, error, refetch, isFetching } = query;
  const keyAccessor = config.item?.key;

  if (isLoading) {
    return (
      <p className="py-8 text-center text-sm text-zinc-500">
        {config.loading ?? "Loading…"}
      </p>
    );
  }

  if (isError) {
    return (
      <div className="space-y-3 py-8 text-center">
        <p className="text-sm text-red-600" role="alert">
          {error.message}
        </p>
        <Button type="button" variant="link" onClick={() => refetch()}>
          Try again
        </Button>
      </div>
    );
  }

  if (!data?.length) {
    return (
      <p className="py-8 text-center text-sm text-zinc-500">
        {config.empty ?? "Nothing here yet."}
      </p>
    );
  }

  return (
    <div className={isFetching ? "opacity-70 transition-opacity" : undefined}>
      <ItemGroup className="gap-2">
        {data.map((item, index) => {
          const key =
            keyAccessor != null && item?.[keyAccessor] != null
              ? item[keyAccessor]
              : index;

          return (
            <ListItem
              key={key}
              item={item}
              config={config}
              mutations={mutations}
            />
          );
        })}
      </ItemGroup>
    </div>
  );
}
