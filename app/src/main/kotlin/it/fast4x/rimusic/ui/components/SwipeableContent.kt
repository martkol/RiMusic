package it.fast4x.rimusic.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Icon
import androidx.compose.material3.SwipeToDismissBox
import androidx.compose.material3.SwipeToDismissBoxValue
import androidx.compose.material3.rememberSwipeToDismissBoxState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.vectorResource
import androidx.compose.ui.unit.dp
import androidx.media3.common.MediaItem
import it.fast4x.rimusic.Database
import it.fast4x.rimusic.R
import it.fast4x.rimusic.ui.components.themed.SmartToast
import it.fast4x.rimusic.ui.styling.LocalAppearance
import it.fast4x.rimusic.utils.mediaItemToggleLike
import kotlinx.coroutines.flow.distinctUntilChanged

@Composable
fun SwipeableContent(
    SwipeToLeftIcon: Int,
    SwipeToRightIcon: Int,
    onSwipeToLeft: () -> Unit,
    onSwipeToRight: () -> Unit,
    content: @Composable () -> Unit
) {
    val (colorPalette) = LocalAppearance.current
    val dismissState = rememberSwipeToDismissBoxState(
        confirmValueChange = { value ->
            if (value == SwipeToDismissBoxValue.StartToEnd) onSwipeToRight()
            else if (value == SwipeToDismissBoxValue.EndToStart) onSwipeToLeft()

            return@rememberSwipeToDismissBoxState false
        }
    )

    SwipeToDismissBox(
        modifier = Modifier,
            //.padding(horizontal = 16.dp)
            //.clip(RoundedCornerShape(12.dp)),
        state = dismissState,
        backgroundContent = {
            Row(
                modifier = Modifier
                    .fillMaxSize()
                    .background(colorPalette.background1)
                    .padding(horizontal = 16.dp),
                horizontalArrangement = when (dismissState.targetValue) {
                    SwipeToDismissBoxValue.StartToEnd -> Arrangement.Start
                    SwipeToDismissBoxValue.EndToStart -> Arrangement.End
                    SwipeToDismissBoxValue.Settled -> Arrangement.Center
                },
                verticalAlignment = Alignment.CenterVertically
            ) {
                Icon(
                    imageVector = when (dismissState.targetValue) {
                        SwipeToDismissBoxValue.StartToEnd -> ImageVector.vectorResource(SwipeToRightIcon)
                        SwipeToDismissBoxValue.EndToStart ->  ImageVector.vectorResource(SwipeToLeftIcon)
                        SwipeToDismissBoxValue.Settled ->  ImageVector.vectorResource(R.drawable.play)
                    },
                    contentDescription = null,
                    tint = colorPalette.accent,
                )
            }
        }
    ) {
        content()
    }
}

@Composable
fun SwipeableQueueItem(
    mediaItem: MediaItem,
    onSwipeToLeft: () -> Unit,
    content: @Composable () -> Unit
) {

    val context = LocalContext.current
    var likedAt by rememberSaveable {
        mutableStateOf<Long?>(null)
    }
    LaunchedEffect(mediaItem.mediaId) {
            Database.likedAt(mediaItem.mediaId).distinctUntilChanged().collect { likedAt = it }
    }
    var updateLike by rememberSaveable { mutableStateOf(false) }
    LaunchedEffect(updateLike) {
        if (updateLike) {
            mediaItemToggleLike(mediaItem)
            updateLike = false
            if (likedAt == null) SmartToast(context.getString(R.string.added_to_favorites))
            else SmartToast(context.getString(R.string.removed_from_favorites))
        }
    }

    SwipeableContent(
        SwipeToLeftIcon = R.drawable.trash,
        SwipeToRightIcon = if (likedAt == null) R.drawable.heart_outline else R.drawable.heart ,
        onSwipeToLeft = onSwipeToLeft,
        onSwipeToRight = { updateLike = true }
    ) {
        content()
    }

}