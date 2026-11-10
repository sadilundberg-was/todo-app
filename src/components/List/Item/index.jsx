import { Pin, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";

function getByAccessor(item, accessor) {
  if (!accessor) return undefined;
  return item?.[accessor];
}

function resolveOptionLabel(value, options = []) {
  const match = options.find((option) => option.id === value);
  return match?.title ?? null;
}

function resolveMetaLabels(item, metaConfig = []) {
  const labels = [];

  for (const meta of metaConfig) {
    const raw = getByAccessor(item, meta.accessor);
    if (raw == null || raw === "") continue;

    if (meta.multiple) {
      for (const value of raw ?? []) {
        const label = resolveOptionLabel(value, meta.options);
        if (label) labels.push(label);
      }
      continue;
    }

    if (meta.options) {
      const label = resolveOptionLabel(raw, meta.options);
      if (label) labels.push(label);
      continue;
    }

    labels.push(String(raw));
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

export function ListItem({ item, config, mutations }) {
  const { title, description, media, actions, variant, size } = config.item;

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
