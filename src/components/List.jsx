"use client";

import { Pin, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";

/**
 * Data-driven list.
 *
 * Props:
 * - query     → react-query query result (whole object)
 * - mutations → map of named mutations used by item media/actions
 * - schema    → {
 *     messages: { empty, loading },
 *     item: { key?, variant, size, title, description, media, actions }
 *   }
 *
 * item.key → unique field on each row (e.g. "id"). Falls back to index.
 */

function getByAccessor(item, accessor) {
  if (!accessor) return undefined;
  return item?.[accessor];
}

function resolveOptionLabel(value, meta) {
  const match = (meta.options ?? []).find(
    (option) => option[meta.value] === value,
  );
  if (!match) return null;
  return match[meta.label];
}

function resolveMetaLabels(item, metaConfig = []) {
  const labels = [];

  for (const meta of metaConfig) {
    const raw = getByAccessor(item, meta.accessor);

    if (meta.multiple) {
      for (const value of raw ?? []) {
        const label = resolveOptionLabel(value, meta);
        if (label) labels.push(label);
      }
      continue;
    }

    const label = resolveOptionLabel(raw, meta);
    if (label) labels.push(label);
  }

  return labels;
}

function buildDescription(item, descriptionConfig) {
  if (!descriptionConfig) return null;

  const notes = getByAccessor(item, descriptionConfig.accessor);
  const meta = resolveMetaLabels(item, descriptionConfig.meta).join(" · ");

  if (!notes && !meta) return null;
  if (notes && meta) return `${notes} · ${meta}`;
  return notes || meta;
}

function ListItem({ item, schema, mutations }) {
  const { title, description, media, actions, variant, size } = schema.item;

  const titleText = getByAccessor(item, title.accessor);
  const completed = Boolean(getByAccessor(item, title.completedAccessor));
  const pinned = Boolean(getByAccessor(item, title.pinnedAccessor));
  const descriptionText = buildDescription(item, description);

  const toggleMutation = media?.mutation ? mutations?.[media.mutation] : null;
  const isMediaBusy = Boolean(toggleMutation?.isPending);

  const actionBusy = (actions ?? []).some((action) => {
    const mutation = mutations?.[action.mutation];
    return Boolean(mutation?.isPending);
  });

  const isBusy = isMediaBusy || actionBusy;

  return (
    <Item variant={variant ?? "outline"} size={size ?? "sm"} role="listitem">
      {media?.type === "checkbox" ? (
        <ItemMedia>
          <Checkbox
            checked={Boolean(getByAccessor(item, media.accessor))}
            disabled={isBusy}
            onCheckedChange={(checked) =>
              toggleMutation?.mutate({
                id: item.id,
                completed: checked === true,
              })
            }
            aria-label={`Mark "${titleText}" as ${completed ? "incomplete" : "complete"}`}
          />
        </ItemMedia>
      ) : null}

      <ItemContent>
        <ItemTitle
          className={completed ? "text-zinc-400 line-through" : "text-zinc-900"}
        >
          {pinned ? <Pin className="size-3.5 text-zinc-500" /> : null}
          {titleText}
        </ItemTitle>
        {descriptionText ? (
          <ItemDescription>{descriptionText}</ItemDescription>
        ) : null}
      </ItemContent>

      {actions?.length ? (
        <ItemActions>
          {actions.map((action) => {
            const mutation = mutations?.[action.mutation];

            if (action.type === "delete") {
              return (
                <Button
                  key={action.mutation}
                  type="button"
                  variant="ghost"
                  size="icon"
                  disabled={isBusy}
                  onClick={() => mutation?.mutate(item.id)}
                  aria-label={`Delete "${titleText}"`}
                >
                  <Trash2 className="h-4 w-4 text-zinc-500" />
                </Button>
              );
            }

            return null;
          })}
        </ItemActions>
      ) : null}
    </Item>
  );
}

export function List({ query, mutations, schema }) {
  const { data, isLoading, isError, error, refetch, isFetching } = query;
  const keyAccessor = schema.item?.key;

  if (isLoading) {
    return (
      <p className="py-8 text-center text-sm text-zinc-500">
        {schema.messages?.loading ?? "Loading…"}
      </p>
    );
  }

  if (isError) {
    return (
      <div className="space-y-3 py-8 text-center">
        <p className="text-sm text-red-600" role="alert">
          {error.message}
        </p>
        <button
          type="button"
          onClick={() => refetch()}
          className="text-sm font-medium text-zinc-900 underline underline-offset-2"
        >
          Try again
        </button>
      </div>
    );
  }

  if (!data?.length) {
    return (
      <p className="py-8 text-center text-sm text-zinc-500">
        {schema.messages?.empty ?? "Nothing here yet."}
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
              schema={schema}
              mutations={mutations}
            />
          );
        })}
      </ItemGroup>
    </div>
  );
}
